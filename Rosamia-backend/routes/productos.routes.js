import { Router } from "express";
import * as productosController from "../controllers/productos.controller.js";

const router = Router();

router.get("/", productosController.getAllProductos);
router.get("/:id", productosController.getProductoById);
router.post("/", productosController.createProducto);
router.put("/:id", productosController.updateProducto);
router.patch("/:id/image", productosController.updateImage);
router.delete("/:id", productosController.deleteProducto);

export default router;
