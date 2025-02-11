import { pool } from "../../../db.js";


export const getMedioPagos = async (req, res) => {
  try {
    const medioPagos = await pool.query("SELECT * FROM mediodepago");
    if (medioPagos.length > 0) {
      res.json(medioPagos[0]);
      return;
    } else {
      res.status(404).json({ message: "No se encontaron medio de pagos" });
    }
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getMedioPagos",
    });
  }
};

export const createMedioPago = async (req, res) => {
  try {
    const { tipo, idCuentas } = req.body;
    if (typeof tipo === "string") {
      const [result] = await pool.query(
        "INSERT INTO mediodepago (tipo, idCuentas ) VALUES(?,?)",
        [tipo, idCuentas]
      );
      const nuevoMedioDePago = {
        idMedioDePago: result.insertId,
        tipo,
        idCuentas
      };
      res.json(nuevoMedioDePago);
      return;
    }
    res.status(400).json({
      message: "Reviste que los datos ingreseados esten en el formato correcto",
    });
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en createMedioPago",
    });
  }
};

export const updateMedioPagos = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo } = req.body;
    if (typeof tipo === "string") {
      const [rows] = await pool.query(
        "UPDATE mediodepago SET tipo = ? WHERE idMedioDePago = ?",
        [tipo,id]
      );
      if (rows.affectedRows === 0) {
        res
          .status(404)
          .json({ message: " No se encontro el medio de pago a actualizar " });
      }

      const [rowSelect] = await pool.query(
        "SELECT * FROM mediodepago WHERE idMedioDePago = ?",
        [id]
      );
      res.json(rowSelect[0]);
      return;
    }
    res.status(400).json({
      message: "Reviste que los datos ingreseados esten en el formato correcto",
    });
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateMedioPagos",
    });
  }
};

export const deleteMedioDePago = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const queryDelete = "DELETE FROM mediodepago WHERE idMedioDePago = ?";
      const [rows] = await pool.query(queryDelete, [id]);
      if (rows.affectedRows === 0) {
        res
          .status(404)
          .json({ error: "No se encontro el medio de pago a eliminar" });
      } else {
        return res.sendStatus(204);
      }
    } else {
      res
        .status(404)
        .json({
          message: "Tiene que pasar el id para saber cual dato se eliminara",
        });
    }
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateMedioPagos",
    });
  }
};
