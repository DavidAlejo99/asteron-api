const express = require('express');
const router = express.Router();
const {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
} = require('../controllers/clientes.controller');

router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/', createCliente);
router.patch('/:id', updateCliente);
router.delete('/:id', deleteCliente);

module.exports = router;