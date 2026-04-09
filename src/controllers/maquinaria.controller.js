const pool = require('../db');

const getMaquinaria = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM maquinaria');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMaquinaById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM maquinaria WHERE id_maquina = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Máquina no encontrada' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMaquina = async (req, res) => {
  try {
    const { nombre, descripcion, estado } = req.body;
    const [result] = await pool.query(
      'INSERT INTO maquinaria (nombre, descripcion, estado) VALUES (?, ?, ?)',
      [nombre, descripcion, estado]
    );
    res.status(201).json({ id_maquina: result.insertId, nombre, descripcion, estado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMaquina = async (req, res) => {
  try {
    const { nombre, descripcion, estado } = req.body;
    const [result] = await pool.query(
      'UPDATE maquinaria SET nombre=?, descripcion=?, estado=? WHERE id_maquina=?',
      [nombre, descripcion, estado, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Máquina no encontrada' });
    res.json({ message: 'Máquina actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMaquina = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM maquinaria WHERE id_maquina = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Máquina no encontrada' });
    res.json({ message: 'Máquina eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMaquinaria, getMaquinaById, createMaquina, updateMaquina, deleteMaquina };