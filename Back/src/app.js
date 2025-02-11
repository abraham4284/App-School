import express from 'express';
import morgan from 'morgan';

//rutas modulo1
import rolesRoutes from './routes/ModuloUsuario/GestionRol/rol.routes.js';
import usuarioRoutes from './routes/ModuloUsuario/GestionUsuario/usuarios.routes.js';
import direccionesRoutes from './routes/ModuloUsuario/GestionDirecciones/direcciones.routes.js';
import contactoRoutes from './routes/ModuloUsuario/GestionContacto/contacto.routes.js';
import { loginUsuario } from './controllers/ModuloUsuario/GestionUsuario/crudUsuarios.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import coutasRoutes from './routes/module_contabilidad/cuotas/cuotas.routes.js'
import cuentasRoutes from './routes/module_contabilidad/cuentas/cuentas.routes.js'
import medioPagosRoutes from './routes/module_contabilidad/medioDePagos/medioDePagos.routes.js'
import interesesRoutes from './routes/module_contabilidad/intereses/intereses.routes.js'
import detalleCuotasRoutes from './routes/module_contabilidad/detalle_cuotas/detalleCuotas.routes.js'
import pagosRoutes from './routes/module_contabilidad/pagos/pagos.routes.js';
import recargosRoutes from './routes/module_contabilidad/recargos/recargos.routes.js'
import reportesRoutes from './routes/module_contabilidad/reportes.cuotas/reportes.cuotas.routes.js'
import alumnosRoutes from './routes/moduleAlumnos/GestionAlumnos/alumnos.routes.js'
import tutorRoutes from './routes/moduleAlumnos/GestionTutor/tutor.routes.js'
import cursosRoutes from './routes/moduleAlumnos/GestionCurso/curso.routes.js'
import materiasRoutes from './routes/moduleAlumnos/GestionMaterias/materias.routes.js'
import orientacionesRoutes from './routes/moduleAlumnos/GestionOrientaciones/orientaciones.routes.js'
import nivelesRoutes from './routes/moduleAlumnos/GestionNiveles/niveles.routes.js'
import turnosRoutes from './routes/moduleAlumnos/GestionTurnos/turnos.routes.js'
import fichamedicaRoutes from './routes/moduleAlumnos/GestionFichaMedica/fichaMedica.routes.js'
import presenciaRoutes from './routes/moduleAlumnos/GestionPresencia/presencia.routes.js'
import tutoAlumnosRoutes from './routes/moduleAlumnos/GestionTutoAlumnos/tutoalumnos.routes.js'
import cursosMateriaRoutes from './routes/moduleAlumnos/GestionCursosMateria/cursosMateria.routes.js'


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
app.post("/api/login", loginUsuario);


app.use("/api",coutasRoutes);
app.use("/api",cuentasRoutes);
app.use("/api",medioPagosRoutes);
app.use("/api",interesesRoutes);
app.use("/api",detalleCuotasRoutes);
app.use("/api",pagosRoutes);
app.use("/api",recargosRoutes);
app.use("/api",reportesRoutes);

app.use("/api/alumnos", alumnosRoutes)
app.use("/api/tutor", tutorRoutes)
app.use("/api/cursos", cursosRoutes)
app.use("/api/materias", materiasRoutes)
app.use("/api/orientaciones", orientacionesRoutes)
app.use("/api/niveles", nivelesRoutes)
app.use("/api/turnos", turnosRoutes)
app.use("/api/fichamedica", fichamedicaRoutes)
app.use("/api/presencia", presenciaRoutes)
app.use("/api/tutoalumnos", tutoAlumnosRoutes)
app.use("/api/cursosmateria", cursosMateriaRoutes)



export default app;
