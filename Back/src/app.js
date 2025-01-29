import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rolesRoutes from './routes/GestionRol/rol.routes.js';

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
app.use('/api', rolesRoutes);
// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor funcionando en http://localhost:3000');
});

export default app;
