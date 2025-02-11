import { pool } from "../../../db.js";

export const crearDetalleDeCuotas = async (
  idCuotas,
  anio,
  cantidadCuotas,
  montoCuotas,
  estado
) => {
  try {
    if (
      typeof anio === "string" &&
      typeof cantidadCuotas === "number" &&
      typeof montoCuotas === "number" &&
      typeof estado === "string"
    ) {
      for (let i = 0; i < cantidadCuotas; i++) {
        const mesIndex = i + 2;
        const nCuotas = i + 1;

        const fechaInicioInicio = new Date(anio, mesIndex, 1);
        const fechaVencimiento = new Date(anio, mesIndex, 10);

        const fechaInicioFormateada = fechaInicioInicio
          .toISOString()
          .slice(0, 10);
        const fechaVencimientoFormateada = fechaVencimiento
          .toISOString()
          .slice(0, 10);

        // Creamos el registro de los detalle cuotas
        const queryInsertDetalleCuotas = `
        INSERT INTO detalleCuota (numCuota,montoUnitario,fechaInicio, fechaVto, estado, idCuotas)
        VALUES(?,?,?,?,?,?)
        `;
        const values = [
          nCuotas,
          montoCuotas,
          fechaInicioFormateada,
          fechaVencimientoFormateada,
          estado,
          idCuotas,
        ];

        const [result] = await pool.query(queryInsertDetalleCuotas, values);
        if (result.affectedRows === 0) {
          console.log("No se registro correctamente");
          return;
        } else {
          console.log("Se registro correctamente");
        }
      }
      return;
    }
  } catch (error) {
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en calcularFechaDeVencimiento",
    });
  }
};
