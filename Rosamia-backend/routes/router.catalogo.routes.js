const express = require('express');
const router = express.Router();
const catalogoController = require('../controllers/catalogo.controller');

// GET: Obtener catálogo actual
router.get('/catalogo', catalogoController.getCatalogo);

// PUT: Registrar descarga
router.put('/catalogo/descarga/:id', catalogoController.registrarDescarga);

// POST: Crear/actualizar catálogo
router.post('/catalogo', catalogoController.crearCatalogo);

// GET: Obtener estadísticas
router.get('/catalogo/estadisticas', catalogoController.getEstadisticas);

module.exports = router; 