const db = require("../config/db");

const getProductos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, name, category, price, description, image, active
      FROM productos
      ORDER BY id DESC
    `);

    return res.status(200).json({
      success: true,
      data: rows,
      message: "Productos obtenidos correctamente",
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al obtener productos",
      error: error.message,
    });
  }
};

const getProductoById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido",
      });
    }

    const [rows] = await db.query(
      `
      SELECT id, name, category, price, description, image, active
      FROM productos
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
      message: "Producto encontrado",
    });
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al obtener el producto",
      error: error.message,
    });
  }
};

module.exports = {
  getProductos,
  getProductoById,
};
