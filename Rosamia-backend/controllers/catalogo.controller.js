const db = require('../config/database');

// GET: Obtener el catÃ¡logo actual
exports.getCatalogo = async (req, res) => {
  try {
    const query = 'SELECT * FROM catalogos ORDER BY id DESC LIMIT 1';
    const [catalogo] = await db.query(query);

    if (catalogo.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No hay catÃ¡logo disponible'
      });
    }

    res.json({
      success: true,
      ...catalogo[0]
    });
  } catch (error) {
    console.error('Error al obtener catÃ¡logo:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el catÃ¡logo',
      error: error.message
    });
  }
};

// PUT: Registrar una descarga
exports.registrarDescarga = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      UPDATE catalogos 
      SET descargas = descargas + 1, 
          ultima_descarga = NOW()
      WHERE id = ?
    `;

    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'CatÃ¡logo no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Descarga registrada correctamente'
    });
  } catch (error) {
    console.error('Error al registrar descarga:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar la descarga'
    });
  }
};

// POST: Crear/Actualizar un catÃ¡logo
exports.crearCatalogo = async (req, res) => {
  try {
    const { titulo, anio, archivo_pdf } = req.body;

    if (!titulo || !archivo_pdf) {
      return res.status(400).json({
        success: false,
        message: 'TÃ­tulo y archivo PDF son requeridos'
      });
    }

    // Primero, obtener el Ãºltimo catÃ¡logo
    const [catalogoActual] = await db.query(
      'SELECT id FROM catalogos ORDER BY id DESC LIMIT 1'
    );

    let query, params;

    if (catalogoActual.length > 0) {
      // Actualizar el existente
      query = `
        UPDATE catalogos 
        SET titulo = ?, anio = ?, archivo_pdf = ?, actualizado_en = NOW()
        WHERE id = ?
      `;
      params = [titulo, anio || new Date().getFullYear(), archivo_pdf, catalogoActual[0].id];
    } else {
      // Crear uno nuevo
      query = `
        INSERT INTO catalogos (titulo, anio, archivo_pdf, descargas, creado_en) 
        VALUES (?, ?, ?, 0, NOW())
      `;
      params = [titulo, anio || new Date().getFullYear(), archivo_pdf];
    }

    await db.query(query, params);

    res.json({
      success: true,
      message: 'CatÃ¡logo guardado correctamente'
    });
  } catch (error) {
    console.error('Error al crear catÃ¡logo:', error);
    res.status(500).json({
      success: false,
      message: 'Error al guardar el catÃ¡logo'
    });
  }
};

// GET: Obtener estadÃ­sticas del catÃ¡logo
exports.getEstadisticas = async (req, res) => {
  try {
    const query = 'SELECT titulo, anio, descargas, ultima_descarga FROM catalogos ORDER BY id DESC LIMIT 1';
    const [stats] = await db.query(query);

    res.json({
      success: true,
      stats: stats[0] || {}
    });
  } catch (error) {
    console.error('Error al obtener estadÃ­sticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadÃ­sticas'
    });
  }
}; 
