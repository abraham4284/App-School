import { pool } from '../../../db.js';

export const cambiarEstadoCuota = async (estado,idDetalleCuota)=>{
    try {   
        if(idDetalleCuota && typeof estado === "string"){
            const queryUpdateByEstadoDetalleCuota = 
            "UPDATE detallecuota SET estado = ? WHERE idDetalleCuota = ?"
            const [ result ] = await pool.query(queryUpdateByEstadoDetalleCuota,[estado,idDetalleCuota])

            result.affectedRows === 0 
            ? res.status(404).json({message: "No se pudo modificar el estado de la cuota "})
            :""
        }
        
    } catch (error) {
        res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en cambiarEstadoCuota",
    });
    }
}