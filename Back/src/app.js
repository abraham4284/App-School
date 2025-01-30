import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import coutasRoutes from './routes/cuotas/cuotas.routes.js'

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


export default app;

