const db = require("../config/db");

const getCatalogoActivo = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, titulo, anio, archivo_pdf, total_descargas, activo
      FROM catalogo
      WHERE activo = 1
      ORDER BY id DESC
      LIMIT 1
    `);

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "No se encontró un catálogo activo"
      });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error cargando catálogo:", error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener catálogo",
      error: error.message
    });
  }
};

const registrarDescarga = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `
      UPDATE catalogo
      SET total_descargas = total_descargas + 1
      WHERE id = ?
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Descarga registrada"
    });
  } catch (error) {
    console.error("Error registrando descarga:", error);
    return res.status(500).json({
      success: false,
      message: "Error al registrar descarga",
      error: error.message
    });
  }
};

module.exports = {
  getCatalogoActivo,
  registrarDescarga
};