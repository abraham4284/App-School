import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import coutasRoutes from './routes/cuotas/cuotas.routes.js'
import alumnosRoutes from './routes/GestionAlumnos/alumnos.routes.js'
import tutorRoutes from './routes/GestionTutor/tutor.routes.js'
import cursosRoutes from './routes/GestionCurso/curso.routes.js'
import materiasRoutes from './routes/GestionMaterias/materias.routes.js'
import orientacionesRoutes from './routes/GestionOrientaciones/orientaciones.routes.js'
import nivelesRoutes from './routes/GestionNiveles/niveles.routes.js'
import turnosRoutes from './routes/GestionTurnos/turnos.routes.js'
import fichamedicaRoutes from './routes/GestionFichaMedica/fichaMedica.routes.js'
import presenciaRoutes from './routes/GestionPresencia/presencia.routes.js'
import tutoAlumnosRoutes from './routes/GestionTutoAlumnos/tutoalumnos.routes.js'
import cursosMateriaRoutes from './routes/GestionCursosMateria/cursosMateria.routes.js'



const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  }));



app.get("/",(req,res)=>{
  res.send("Api funcionando")
})

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json())


app.use("/api",coutasRoutes)
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

