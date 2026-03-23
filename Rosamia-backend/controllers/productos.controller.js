const Producto = require("../models/producto.model");

const getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    return res.status(200).json({
      success: true,
      data: productos
    });
  } catch (error) {
    console.error("Error en getAllProductos:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al obtener productos",
      error: error.message
    });
  }
};

const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    return res.status(200).json({
      success: true,
      data: producto
    });
  } catch (error) {
    console.error("Error en getProductoById:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al obtener el producto",
      error: error.message
    });
  }
};

const createProducto = async (req, res) => {
  try {
    const { name, category, price, description, image, image2, image3, image4, active } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        success: false,
        message: "El nombre es obligatorio"
      });
    }

    const id = await Producto.create({
      name: String(name).trim(),
      category,
      price,
      description,
      image,
      image2,
      image3,
      image4,
      active
    });

    const nuevoProducto = await Producto.findById(id);

    return res.status(201).json({
      success: true,
      message: "Producto creado correctamente",
      data: nuevoProducto
    });
  } catch (error) {
    console.error("Error en createProducto:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al crear producto",
      error: error.message
    });
  }
};

const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description, image, image2, image3, image4, active } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        success: false,
        message: "El nombre es obligatorio"
      });
    }

    const updated = await Producto.update(id, {
      name: String(name).trim(),
      category,
      price,
      description,
      image,
      image2,
      image3,
      image4,
      active
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    const productoActualizado = await Producto.findById(id);

    return res.status(200).json({
      success: true,
      message: "Producto actualizado correctamente",
      data: productoActualizado
    });
  } catch (error) {
    console.error("Error en updateProducto:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al actualizar producto",
      error: error.message
    });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Producto.remove(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente"
    });
  } catch (error) {
    console.error("Error en deleteProducto:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno al eliminar producto",
      error: error.message
    });
  }
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};