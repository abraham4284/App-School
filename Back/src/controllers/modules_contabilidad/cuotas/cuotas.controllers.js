import { pool } from "../../../db.js";
import { crearDetalleDeCuotas } from "../../../helpers/module_contabilidad/cuotas/calcularFechaDeVencimiento.js";

export const getPlanCuotas = async (_, res) => {
  try {
    const planCuotas = await pool.query("SELECT * FROM cuotas");
    if (planCuotas.length <= 0) {
      console.log("No existen planes cargados");
      return;
    }

    res.json(planCuotas[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getCuotas",
    });
  }
};

export const getPlanCuotasByIdAlumnos = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const planCuotasByIdAlumnos = await pool.query(
        "SELECT * FROM cuotas WHERE idAlumnos = ?",
        [id]
      );
      if (planCuotasByIdAlumnos.length <= 0) {
        console.log("No existe planes cargados");
        return;
      }

      res.json(planCuotasByIdAlumnos[0]);
      
    } else {
      console.log("Tiene que ingresar el id");
    }
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getPlanCuotasByIdAlumnos",
    });
  }
};

export const createPlanCuotas = async (req, res) => {
  try {
    const { cantidadCuotas, monto, idAlumnos } = req.body;
    //1- Validamos que los tipos de datos sean los correctos
    if (typeof cantidadCuotas === "number" && typeof monto === "number") {
      // 2-Creamamos los datos estaticos por cada creacion de un plan
      const anio = new Date().getFullYear().toLocaleString();
      const estado = "PENDIENTE";
      const idUsuarios = 1;
      const idRol = 1;
      const total = parseFloat(cantidadCuotas * monto);

      // 3- Insertamos los datos en la db, tabla Cuotas
      const queryInsertPlanCuotas =
        "INSERT INTO cuotas (anio,cantidadCuotas,monto,total,idUsuarios,idRol,idAlumnos) VALUES (?,?,?,?,?,?,?)";
      const values = [
        anio,
        cantidadCuotas,
        monto,
        total,
        idUsuarios,
        idRol,
        idAlumnos,
      ];

      const [result] = await pool.query(queryInsertPlanCuotas, values);
      const idCuotas = result.insertId;

      // 4-Creamos del detalle de cada cuota
      await crearDetalleDeCuotas(idCuotas, anio, cantidadCuotas, monto, estado);

      res.json("Plan registrado");
      return;
    }

    res.status(404).json({
      mesasge: "Los datos ingresados no conincide con el tipo de dato de la db",
    });
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en createPlanCuotas",
    });
  }
};
