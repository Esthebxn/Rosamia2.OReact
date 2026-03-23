const express = require("express");
const router = express.Router();
const {
  getCatalogoActivo,
  registrarDescarga
} = require("../controllers/catalogo.controller");

router.get("/", getCatalogoActivo);
router.put("/descarga/:id", registrarDescarga);

module.exports = router;