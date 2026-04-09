const express = require('express');
const router = express.Router();
const {
  getMaquinaria,
  getMaquinaById,
  createMaquina,
  updateMaquina,
  deleteMaquina
} = require('../controllers/maquinaria.controller');

router.get('/', getMaquinaria);
router.get('/:id', getMaquinaById);
router.post('/', createMaquina);
router.patch('/:id', updateMaquina);
router.delete('/:id', deleteMaquina);

module.exports = router;