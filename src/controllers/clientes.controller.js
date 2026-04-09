const pool = require('../db');

const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClienteById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCliente = async (req, res) => {
  try {
    const { nombre, nit, telefono, correo, direccion } = req.body;
    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, nit, telefono, correo, direccion) VALUES (?, ?, ?, ?, ?)',
      [nombre, nit, telefono, correo, direccion]
    );
    res.status(201).json({ id_cliente: result.insertId, nombre, nit, telefono, correo, direccion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCliente = async (req, res) => {
  try {
    const { nombre, nit, telefono, correo, direccion } = req.body;
    const [result] = await pool.query(
      'UPDATE clientes SET nombre=?, nit=?, telefono=?, correo=?, direccion=? WHERE id_cliente=?',
      [nombre, nit, telefono, correo, direccion, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json({ message: 'Cliente actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getClientes, getClienteById, createCliente, updateCliente, deleteCliente };