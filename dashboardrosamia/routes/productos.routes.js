const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productos.controller");

router.get("/", productosController.getProductos);
router.get("/:id", productosController.getProductoById);

module.exports = router;
