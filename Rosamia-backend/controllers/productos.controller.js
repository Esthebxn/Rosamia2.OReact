const Producto = require('../models/producto.model');

exports.getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json({
      success: true,
      count: productos.length,
      data: productos
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      data: producto
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el producto',
      error: error.message
    });
  }
};

exports.createProducto = async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, precio e imagen son requeridos'
      });
    }

    const insertId = await Producto.create(req.body);
    const nuevoProducto = await Producto.findById(insertId);

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: nuevoProducto
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear producto',
      error: error.message
    });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existe = await Producto.findById(id);
    if (!existe) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    await Producto.update(id, req.body);
    const productoActualizado = await Producto.findById(id);

    res.json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: productoActualizado
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar producto',
      error: error.message
    });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'URL de imagen requerida'
      });
    }

    const existe = await Producto.findById(id);
    if (!existe) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    await Producto.updateImage(id, image);
    const productoActualizado = await Producto.findById(id);

    res.json({
      success: true,
      message: 'Imagen actualizada exitosamente',
      data: productoActualizado
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar imagen',
      error: error.message
    });
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const existe = await Producto.findById(id);
    if (!existe) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    await Producto.delete(id);

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar producto',
      error: error.message
    });
  }
}; 