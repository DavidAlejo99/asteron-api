const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

// Rutas
const clientesRoutes = require('./src/routes/clientes.routes');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const pedidosRoutes = require('./src/routes/pedidos.routes');
const proyectosRoutes = require('./src/routes/proyectos.routes');
const maquinariaRoutes = require('./src/routes/maquinaria.routes');

app.use('/api/clientes', clientesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/maquinaria', maquinariaRoutes);

// Ruta Not Found (404)
app.use((req, res, next) => {
  res.status(404).json({ message: `Ruta '${req.url}' no encontrada` });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});