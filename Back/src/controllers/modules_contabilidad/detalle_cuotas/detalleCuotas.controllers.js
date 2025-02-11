import { pool } from "../../../db.js";

export const getDetalleCuotasByIdCuotas = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const querySelectByIdCuotas =
        "SELECT * FROM detalleCuota WHERE idCuotas = ?";
      const detalleCuotasByIdCuotas = await pool.query(querySelectByIdCuotas, [
        id,
      ]);
      res.json(detalleCuotasByIdCuotas[0]);
    } else {
      res
        .status(404)
        .json({
          message: "Debe ingresar el id para poder realizar la busqueda",
        });
    }
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getDetalleCuotasByIdCuotas",
    });
  }
};
