import express from 'express';
import morgan from 'morgan';
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


app.use("/api",coutasRoutes);
app.use("/api",cuentasRoutes);
app.use("/api",medioPagosRoutes);
app.use("/api",interesesRoutes);
app.use("/api",detalleCuotasRoutes);
app.use("/api",pagosRoutes);
app.use("/api",recargosRoutes);
app.use("/api",reportesRoutes);


export default app;

