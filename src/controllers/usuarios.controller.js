const pool = require('../db');

const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.id_usuario, u.nombre, u.correo, u.estado, r.nombre as rol
      FROM usuarios u
      JOIN roles r ON u.id_rol = r.id_rol
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.id_usuario, u.nombre, u.correo, u.estado, r.nombre as rol
      FROM usuarios u
      JOIN roles r ON u.id_rol = r.id_rol
      WHERE u.id_usuario = ?
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, id_rol, estado } = req.body;
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contraseña, id_rol, estado) VALUES (?, ?, ?, ?, ?)',
      [nombre, correo, contraseña, id_rol, estado]
    );
    res.status(201).json({ id_usuario: result.insertId, nombre, correo, id_rol, estado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, id_rol, estado } = req.body;
    const [result] = await pool.query(
      'UPDATE usuarios SET nombre=?, correo=?, contraseña=?, id_rol=?, estado=? WHERE id_usuario=?',
      [nombre, correo, contraseña, id_rol, estado, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario };