import { pool } from "../../../db.js";

export const aplicarRecargoByCuota = async (
  idCuotas,
  idDetalleCuota,
  idIntereses,
  totalPlan,
  montoUnitario,
  porcentaje
) => {
  try {
    let recargo = parseFloat(montoUnitario * porcentaje) / 100;
    let valorFinalCuota = parseFloat(montoUnitario) + parseFloat(recargo);
    let nuevoTotalPlan = parseFloat(totalPlan) + parseFloat(recargo);

    const queryUpdateDetalleCuotas =
      "UPDATE detallecuota SET recargo = ?, valorFinalCuota = ?, idIntereses = ? WHERE idDetalleCuota = ?";
    const queryUpdatePlanCuotas =
      "UPDATE cuotas SET total = ? WHERE idCuotas = ?";

    const valuesDetalleCuotas = [
      recargo,
      valorFinalCuota,
      idIntereses,
      idDetalleCuota,
    ];

    const valuesCuotas = [nuevoTotalPlan, idCuotas];

    const [detalleCuotas] = await pool.query(
      queryUpdateDetalleCuotas,
      valuesDetalleCuotas
    );
    const [cuotas] = await pool.query(queryUpdatePlanCuotas, valuesCuotas);

    if (detalleCuotas.affectedRows === 0 && cuotas.affectedRows === 0) {
      return console.log("Los datos nuevos no se registraron");
    } else {
      const datosActualizados = {
        idCuotas,
        idDetalleCuota,
        recargo,
        valorFinalCuota,
        nuevoTotalPlan,
      };

      return {
        datosActualizados,
        message: "Datos guardados correctamente",
      };
    }
  } catch (error) {
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en aplicarRecargoByCuota",
    });
  }
};
