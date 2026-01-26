const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rosamia_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test de conexión
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado a MySQL - Base de datos:', process.env.DB_NAME);
    connection.release();
  } catch (err) {
    console.error('❌ Error conectando a MySQL:', err.message);
  }
})();

module.exports = pool; 