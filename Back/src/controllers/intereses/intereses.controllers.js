import { pool } from "../../db.js";

export const getIntereses = async (req, res) => {
  try {
    const intereses = await pool.query("SELECT * FROM intereses");
    if (intereses.length > 0) {
      res.json(intereses[0]);
      return;
    }
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getIntereses",
    });
  }
};

export const createIntereses = async (req, res) => {
  try {
    const { porcentaje, dias, idDetalleCuota, idCuotas } = req.body;
    if (typeof porcentaje === "number" && typeof dias === "number") {
      const queryInsert =
        "INSERT INTO intereses (porcentaje,dias,idDetalleCuota, idCuotas) VALUES (?,?,?,?)";
      const values = [porcentaje, dias, idDetalleCuota, idCuotas];
      const [result] = await pool.query(queryInsert, values);
      const nuevoInteresGuardado = {
        idInteres: result.insertId,
        porcentaje,
        dias,
        idDetalleCuota,
        idCuotas,
      };
      res.status(201).json(nuevoInteresGuardado);
    }

    res
      .status(400)
      .json({
        message:
          "Reviste que los datos ingreseados esten en el formato correcto",
      });
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getIntereses",
    });
  }
};

// Anotacion, 

export const updateIntereses = async (req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateIntereses",
    }); 
    }
}