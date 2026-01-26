const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const axios = require('axios');
require('dotenv').config();

const productosRoutes = require('./routes/productos.routes');

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5500'], // Agregar todos los posibles orígenes
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Configuración de base de datos MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rosamia_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Middleware para pasar el pool a las rutas
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Verificar configuración inicial
console.log('🔧 Configuración inicial:');
console.log(`   Database: ${process.env.DB_NAME || 'No configurada'}`);
console.log(`   Gemini API Key: ${process.env.GOOGLE_API_KEY ? '✅ Configurada' : '❌ NO configurada'}`);
console.log(`   Port: ${process.env.PORT || 5000}`);

// Rutas existentes (productos)
app.use('/api/productos', productosRoutes);

// ========== RUTAS PARA EL CHATBOT ==========

// 1. Ruta de salud mejorada
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    
    // Verificar si tenemos API key de Gemini
    const hasGeminiKey = !!process.env.GOOGLE_API_KEY;
    const keyLength = process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY.length : 0;
    const maskedKey = process.env.GOOGLE_API_KEY 
      ? `${process.env.GOOGLE_API_KEY.substring(0, 5)}...${process.env.GOOGLE_API_KEY.substring(keyLength - 5)}`
      : 'No configurada';
    
    res.json({
      status: 'OK',
      database: 'Conectada',
      gemini: {
        configured: hasGeminiKey,
        keyPreview: maskedKey,
        length: keyLength
      },
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    console.error('❌ Error en health check:', error);
    res.status(500).json({
      status: 'Error',
      database: 'Desconectada',
      error: error.message
    });
  }
});

// 2. Obtener mensajes del chat
app.get('/api/messages', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    // Primero, crear la tabla si no existe
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text TEXT NOT NULL,
        sender VARCHAR(50) NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_sender (sender),
        INDEX idx_timestamp (timestamp)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    // Obtener mensajes
    const [rows] = await connection.execute(
      'SELECT id, text, sender, timestamp FROM messages ORDER BY timestamp ASC LIMIT 100'
    );
    
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('❌ Error obteniendo mensajes:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al obtener mensajes',
      message: error.message 
    });
  }
});

// 3. Guardar mensaje en el chat
app.post('/api/messages', async (req, res) => {
  try {
    const { text, sender, timestamp } = req.body;
    
    if (!text || !sender) {
      return res.status(400).json({
        success: false,
        message: 'Texto y remitente son requeridos'
      });
    }
    
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      'INSERT INTO messages (text, sender, timestamp) VALUES (?, ?, ?)',
      [text, sender, timestamp || new Date()]
    );
    
    connection.release();
    
    res.json({
      success: true,
      id: result.insertId,
      text,
      sender,
      timestamp: timestamp || new Date()
    });
  } catch (error) {
    console.error('❌ Error guardando mensaje:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al guardar mensaje',
      message: error.message 
    });
  }
});

// 4. Obtener datos de entrenamiento
app.get('/api/training', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    // Crear tabla si no existe
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS training_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        keyword VARCHAR(255) NOT NULL,
        response TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_keyword (keyword),
        INDEX idx_keyword (keyword)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    // Obtener datos de entrenamiento
    const [rows] = await connection.execute(
      'SELECT keyword, response, created_at FROM training_data ORDER BY created_at DESC'
    );
    
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('❌ Error obteniendo datos de entrenamiento:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al obtener datos de entrenamiento',
      message: error.message 
    });
  }
});

// 5. Guardar datos de entrenamiento
app.post('/api/training', async (req, res) => {
  try {
    const { keyword, response } = req.body;
    
    if (!keyword || !response) {
      return res.status(400).json({
        success: false,
        message: 'Palabra clave y respuesta son requeridas'
      });
    }
    
    const connection = await pool.getConnection();
    
    // Insertar o actualizar si ya existe
    const [result] = await connection.execute(
      `INSERT INTO training_data (keyword, response) 
       VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE response = ?, updated_at = CURRENT_TIMESTAMP`,
      [keyword, response, response]
    );
    
    connection.release();
    
    console.log(`✅ Entrenamiento guardado: "${keyword}" -> "${response.substring(0, 50)}..."`);
    
    res.json({
      success: true,
      keyword,
      response,
      affectedRows: result.affectedRows,
      isUpdate: result.affectedRows === 2 // 2 rows affected means it was an update
    });
  } catch (error) {
    console.error('❌ Error guardando entrenamiento:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al guardar entrenamiento',
      message: error.message 
    });
  }
});

// ✅ RUTA DEL CHAT - Procesar mensajes con Gemini (ACTUALIZADA)
app.post('/api/chat/message', async (req, res) => {
  try {
    const { message } = req.body;

    // Validación
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'El mensaje no puede estar vacío',
        reply: 'Por favor, escribe algo para poder ayudarte.'
      });
    }

    // Verificar si tenemos API key
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.warn('⚠️  API Key de Gemini no configurada en variables de entorno');
      return res.status(500).json({
        success: false,
        message: 'API Key de Gemini no configurada',
        reply: 'Lo siento, el servicio de IA no está disponible en este momento. Estamos en modo local.'
      });
    }

    console.log(`🤖 Procesando mensaje: "${message.substring(0, 50)}..."`);

    // Llamar a Google Gemini API (versión actualizada)
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        contents: [{
          parts: [{ text: message }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      },
      {
        params: { key: apiKey },
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 15000 // 15 segundos timeout
      }
    );

    // Extraer respuesta de manera más robusta
    let botReply;
    try {
      if (response.data && 
          response.data.candidates && 
          response.data.candidates[0] && 
          response.data.candidates[0].content &&
          response.data.candidates[0].content.parts &&
          response.data.candidates[0].content.parts[0]) {
        botReply = response.data.candidates[0].content.parts[0].text.trim();
      } else {
        botReply = 'Lo siento, no pude generar una respuesta adecuada. ¿Podrías reformular tu pregunta?';
      }
    } catch (parseError) {
      console.error('❌ Error parseando respuesta de Gemini:', parseError);
      botReply = 'Recibí una respuesta inesperada del servicio de IA. Intenta nuevamente.';
    }

    console.log(`✅ Respuesta generada: "${botReply.substring(0, 50)}..."`);

    res.json({
      success: true,
      reply: botReply,
      timestamp: new Date(),
      model: 'gemini-1.5-flash',
      tokens: response.data.usageMetadata ? response.data.usageMetadata.totalTokenCount : 'unknown'
    });

  } catch (error) {
    console.error('❌ Error en chat con Gemini:', error.message);
    
    // Respuesta de fallback detallada
    let errorMessage = 'Error procesando el mensaje';
    let botReply = 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta nuevamente.';
    
    if (error.response) {
      console.error('📊 Error de API Gemini:', {
        status: error.response.status,
        data: error.response.data
      });
      
      errorMessage = `Error de API: ${error.response.status}`;
      
      // Mensajes más específicos según el error
      if (error.response.status === 400) {
        botReply = 'Tu mensaje contiene contenido que no puedo procesar. Por favor, reformula tu pregunta.';
      } else if (error.response.status === 403) {
        botReply = 'No tengo acceso al servicio de IA. Esto podría deberse a un problema con la configuración.';
      } else if (error.response.status === 429) {
        botReply = 'He recibido demasiadas solicitudes. Por favor, espera un momento antes de intentar nuevamente.';
      }
      
    } else if (error.request) {
      console.error('🔌 No se recibió respuesta de Gemini API (timeout)');
      errorMessage = 'Timeout - No se recibió respuesta de Gemini API';
      botReply = 'El servicio de IA está tardando demasiado en responder. Intenta con una pregunta más corta o vuelve a intentarlo más tarde.';
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Timeout excedido';
      botReply = 'La solicitud tardó demasiado. Intenta con una pregunta más simple.';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      reply: botReply,
      error: error.message,
      timestamp: new Date()
    });
  }
});

// 6. Limpiar historial de chat
app.delete('/api/messages', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute('DELETE FROM messages');
    
    connection.release();
    
    console.log(`🗑️  Historial limpiado: ${result.affectedRows} mensajes eliminados`);
    
    res.json({
      success: true,
      message: 'Historial de chat limpiado',
      deletedRows: result.affectedRows
    });
  } catch (error) {
    console.error('❌ Error limpiando mensajes:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al limpiar mensajes' 
    });
  }
});

// 7. Verificar configuración del API Key
app.get('/api/check-gemini', (req, res) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const hasKey = !!apiKey;
  const keyLength = apiKey ? apiKey.length : 0;
  
  // Mostrar solo los primeros y últimos caracteres por seguridad
  const maskedKey = apiKey 
    ? `${apiKey.substring(0, 4)}...${apiKey.substring(keyLength - 4)}`
    : 'No configurada';
  
  res.json({
    configured: hasKey,
    keyLength: keyLength,
    keyPreview: maskedKey,
    validLength: keyLength >= 39, // Gemini keys are usually 39+ chars
    model: 'gemini-1.5-flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
  });
});

// Ruta principal actualizada
app.get('/', (req, res) => {
  res.json({ 
    message: '🎂 API Rosamia funcionando',
    version: '2.0.0',
    database: process.env.DB_NAME || 'rosamia_db',
    endpoints: {
      productos: '/api/productos',
      chat: {
        health: '/api/health',
        messages: {
          get: '/api/messages',
          post: '/api/messages',
          delete: '/api/messages'
        },
        training: {
          get: '/api/training',
          post: '/api/training'
        },
        ai: {
          post: '/api/chat/message',
          check: '/api/check-gemini'
        }
      }
    },
    status: {
      database: 'online',
      gemini: process.env.GOOGLE_API_KEY ? 'configured' : 'not_configured'
    },
    timestamp: new Date()
  });
});

// Ruta de salud original (mantener compatibilidad)
app.get('/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    
    res.json({
      status: 'OK',
      database: 'Conectada',
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      database: 'Desconectada',
      error: error.message
    });
  }
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.url}`,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /api/health',
      'GET /api/messages',
      'POST /api/messages',
      'GET /api/training',
      'POST /api/training',
      'POST /api/chat/message',
      'DELETE /api/messages',
      'GET /api/check-gemini'
    ]
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('💥 Error global:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Contacta al administrador'
  });
});

const PORT = process.env.PORT || 5000;

// Función para inicializar tablas
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Crear tablas si no existen
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text TEXT NOT NULL,
        sender VARCHAR(50) NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_sender (sender),
        INDEX idx_timestamp (timestamp)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS training_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        keyword VARCHAR(255) NOT NULL,
        response TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_keyword (keyword),
        INDEX idx_keyword (keyword)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    connection.release();
    console.log('✅ Base de datos inicializada correctamente');
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
  }
}

// Iniciar servidor
app.listen(PORT, async () => {
  await initializeDatabase();
  
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 API Productos: http://localhost:${PORT}/api/productos`);
  console.log(`💬 Chatbot Endpoints:`);
  console.log(`   📡 Health: http://localhost:${PORT}/api/health`);
  console.log(`   💾 Mensajes: http://localhost:${PORT}/api/messages`);
  console.log(`   🎓 Entrenamiento: http://localhost:${PORT}/api/training`);
  console.log(`   🤖 Gemini AI: http://localhost:${PORT}/api/chat/message`);
  console.log(`   🔍 Check API: http://localhost:${PORT}/api/check-gemini`);
  console.log(`\n🗄️  Base de datos: ${process.env.DB_NAME || 'rosamia_db'}`);
  console.log(`🔑 Gemini API Key: ${process.env.GOOGLE_API_KEY ? '✅ Configurada' : '❌ NO CONFIGURADA'}`);
  if (process.env.GOOGLE_API_KEY) {
    console.log(`   Longitud: ${process.env.GOOGLE_API_KEY.length} caracteres`);
  }
  console.log(`\n⚠️  PARA CONFIGURAR LA API KEY:`);
  console.log(`   1. Crea un archivo .env en la raíz del proyecto`);
  console.log(`   2. Agrega: GOOGLE_API_KEY=tu_api_key_aqui`);
  console.log(`   3. Reinicia el servidor\n`);
});

// Manejo de cierre graceful
process.on('SIGINT', async () => {
  console.log('\n⛔ Cerrando servidor...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⛔ Terminando servidor...');
  await pool.end();
  process.exit(0);
}); 