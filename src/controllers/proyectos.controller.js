const pool = require('../db');

const getProyectos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, 
        u.nombre as nombre_responsable,
        c.nombre as nombre_cliente
      FROM proyectos p
      JOIN usuarios u ON p.id_usuario_responsable = u.id_usuario
      JOIN clientes c ON p.id_cliente = c.id_cliente
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProyectoById = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, 
        u.nombre as nombre_responsable,
        c.nombre as nombre_cliente
      FROM proyectos p
      JOIN usuarios u ON p.id_usuario_responsable = u.id_usuario
      JOIN clientes c ON p.id_cliente = c.id_cliente
      WHERE p.id_proyecto = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProyecto = async (req, res) => {
  try {
    const { nombre, objetivo, fecha_inicio, fecha_fin_estimada, id_usuario_responsable, id_cliente, id_pedido } = req.body;
    const [result] = await pool.query(
      'INSERT INTO proyectos (nombre, objetivo, fecha_inicio, fecha_fin_estimada, id_usuario_responsable, id_cliente, id_pedido) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, objetivo, fecha_inicio, fecha_fin_estimada, id_usuario_responsable, id_cliente, id_pedido]
    );
    res.status(201).json({ id_proyecto: result.insertId, nombre, objetivo, fecha_inicio, fecha_fin_estimada, id_usuario_responsable, id_cliente, id_pedido });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProyecto = async (req, res) => {
  try {
    const { nombre, objetivo, fecha_inicio, fecha_fin_estimada, id_usuario_responsable, id_cliente, id_pedido } = req.body;
    const [result] = await pool.query(
      'UPDATE proyectos SET nombre=?, objetivo=?, fecha_inicio=?, fecha_fin_estimada=?, id_usuario_responsable=?, id_cliente=?, id_pedido=? WHERE id_proyecto=?',
      [nombre, objetivo, fecha_inicio, fecha_fin_estimada, id_usuario_responsable, id_cliente, id_pedido, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
    res.json({ message: 'Proyecto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProyecto = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM proyectos WHERE id_proyecto = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
    res.json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProyectos, getProyectoById, createProyecto, updateProyecto, deleteProyecto };