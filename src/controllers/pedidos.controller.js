const pool = require('../db');

const getPedidos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.nombre as nombre_cliente 
      FROM pedidos p
      JOIN clientes c ON p.id_cliente = c.id_cliente
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPedidoById = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.nombre as nombre_cliente 
      FROM pedidos p
      JOIN clientes c ON p.id_cliente = c.id_cliente
      WHERE p.id_pedido = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPedido = async (req, res) => {
  try {
    const { id_cliente, fecha_pedido, estado, descripcion } = req.body;
    const [result] = await pool.query(
      'INSERT INTO pedidos (id_cliente, fecha_pedido, estado, descripcion) VALUES (?, ?, ?, ?)',
      [id_cliente, fecha_pedido, estado, descripcion]
    );
    res.status(201).json({ id_pedido: result.insertId, id_cliente, fecha_pedido, estado, descripcion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePedido = async (req, res) => {
  try {
    const { id_cliente, fecha_pedido, estado, descripcion } = req.body;
    const [result] = await pool.query(
      'UPDATE pedidos SET id_cliente=?, fecha_pedido=?, estado=?, descripcion=? WHERE id_pedido=?',
      [id_cliente, fecha_pedido, estado, descripcion, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json({ message: 'Pedido actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePedido = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM pedidos WHERE id_pedido = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPedidos, getPedidoById, createPedido, updatePedido, deletePedido };