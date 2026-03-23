const express = require('express');
const router = express.Router();
const catalogoController = require('../controllers/catalogo.controller');

// GET: Obtener catÃ¡logo actual
router.get('/catalogo', catalogoController.getCatalogo);

// PUT: Registrar descarga
router.put('/catalogo/descarga/:id', catalogoController.registrarDescarga);

// POST: Crear/actualizar catÃ¡logo
router.post('/catalogo', catalogoController.crearCatalogo);

// GET: Obtener estadÃ­sticas
router.get('/catalogo/estadisticas', catalogoController.getEstadisticas);

module.exports = router; 
