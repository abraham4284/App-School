import { pool } from "../../../db.js";
import { generarNumeroDeOperacion } from "../../../helpers/module_contabilidad/cuotas/generarNumeroOperacion.js";

export const createPagoByCuota = async (req, res) => {
  try {
    const {
      idCuotas,
      idDetalleCuota,
      fechaDelPago,
      montoPag,
      idMedioDePago,
      idIntereses,
    } = req.body;
    console.log(req.body)
    if( idCuotas === ( null || undefined ) || idDetalleCuota === ( null || undefined )  || idMedioDePago === ( null || undefined ) ){
      return res.status(400).json({ message: "Faltan parámetros obligatorios" });
    }

    if(!(typeof fechaDelPago === "string") || !(typeof montoPag === "number")){
      return res.status(400).json({
        message: `El formato de ${fechaDelPago} o ${montoPag} no es correcto`
      })
    }

    const estado = "COMPLETADO";
    const NOperacion = generarNumeroDeOperacion();

    const query =
    "UPDATE detallecuota SET fechaDelPago = ?, montoPag = ?, estado = ?, NOperacion = ?, idMedioDePago = ? WHERE idDetalleCuota = ?"
    const values = [ fechaDelPago, montoPag, estado, NOperacion, idMedioDePago, idDetalleCuota ]

    const [ rows ] = await pool.query(query,values);

    if(rows.affectedRows === 0){
      return res.status(404).json({error: "No se registro el pago"})
    }

    return res.json({message:" Pago registrado exitosamente"})

  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en createPagoByCuota",
    });
  }
};
