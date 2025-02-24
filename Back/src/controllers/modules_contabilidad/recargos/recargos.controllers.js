import { pool } from "../../../db.js";
import { aplicarRecargoByCuota } from "../../../helpers/module_contabilidad/recargos/AplicarRecargoByCuota.js";

export const cobrarRecargoByCuotas = async (req, res) => {
  try {
    const { idCuotas, idDetalleCuota, idIntereses } = req.body;

    if (
      idCuotas === (null || undefined) ||
      idDetalleCuota === (null || undefined) ||
      idIntereses === (null || undefined)
    ) {
      return res
        .status(400)
        .json({ message: "Faltan parámetros obligatorios" });
    }

    const [cuotas] = await pool.query(
      "CALL getIdCuotas(?)",
      [idCuotas]
    );
    const [detalleCuotas] = await pool.query(
      "CALL getIdDetalleCuotas(?)",
      [idDetalleCuota]
    );
    const [intereses] = await pool.query(
      "CALL getInteresById(?)",
      [idIntereses]
    );

    const { total } = cuotas.length > 0 ? cuotas[0][0] : {};
    const { montoUnitario } = detalleCuotas.length > 0 ? detalleCuotas[0][0] : {};
    const { porcentaje } = intereses.length > 0 ? intereses[0][0] : {};
   

    const data = await aplicarRecargoByCuota(
      idCuotas,
      idDetalleCuota,
      idIntereses,
      total,
      montoUnitario,
      porcentaje
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en cobrarRecargoByCuotas",
    });
  }
};
