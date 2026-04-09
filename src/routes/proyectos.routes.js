const express = require('express');
const router = express.Router();
const {
  getProyectos,
  getProyectoById,
  createProyecto,
  updateProyecto,
  deleteProyecto
} = require('../controllers/proyectos.controller');

router.get('/', getProyectos);
router.get('/:id', getProyectoById);
router.post('/', createProyecto);
router.patch('/:id', updateProyecto);
router.delete('/:id', deleteProyecto);

module.exports = router;