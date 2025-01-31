import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//rutas modulo1
import rolesRoutes from './routes/GestionRol/rol.routes.js';
import usuarioRoutes from './routes/GestionUsuario/usuarios.routes.js';
import direccionesRoutes from './routes/GestionDirecciones/direcciones.routes.js';
import contactoRoutes from './routes/GestionContacto/contacto.routes.js';
const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL, // Asegúrate de que FRONTEND_URL esté definido en .env
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json()); // Usa solo express.json() en lugar de body-parser

// Rutas
app.get("/", (req, res) => {
  res.send("API funcionando");
});
app.use('/api/roles', rolesRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/direcciones', direccionesRoutes);
app.use('/api/contacto', contactoRoutes);

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor funcionando en http://localhost:3000');
});

export default app;
