import { pool } from "../../db.js";

export const getCuentas = async (req, res) => {
  try {
    const cuentas = await pool.query("SELECT * FROM cuentas");
    if (cuentas.length > 0) {
      res.json(cuentas[0]);
      return;
    }

    res.status(404).json("No se encontro el contenido solicitado");
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getCuentas",
    });
  }
};

export const createCuentas = async (req, res) => {
  try {
    const { nombre, CBU_CVU, alias } = req.body;
    if (
      typeof nombre === "string" &&
      typeof CBU_CVU === "string" &&
      typeof alias === "string"
    ) {
      const queryInsertCuentas =
        "INSERT INTO cuentas (nombre, CBU_CVU, alias) VALUES (?,?,?) ";
      const values = [nombre, CBU_CVU, alias];
      const [result] = await pool.query(queryInsertCuentas, values);
      const nuevaCuenta = {
        idCuentas: result.insertId,
        nombre,
        CBU_CVU,
        alias,
      };
      res.status(201).json(nuevaCuenta);
      
    }

    res.status(400).json({ message: "Reviste que los datos ingreseados esten en el formato correcto" });
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en createCuentas",
    });
  }
};

export const updateCuentas = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, CBU_CVU, alias } = req.body;
    if (
      typeof nombre === "string" &&
      typeof CBU_CVU === "string" &&
      typeof alias === "string"
    ) {
      const queryUpdate = `
            UPDATE cuentas SET nombre = ?, CBU_CVU = ?, alias = ? WHERE idCuentas = ?
            `;
      const values = [nombre, CBU_CVU, alias, id];
      const [rows] = await pool.query(queryUpdate, values);
      if (rows.affectedRows === 0) {
        res
          .status(404)
          .json({ message: " No se pudo actualizar correctamente" });
      }

      const [rowSelect] = await pool.query(
        "SELECT * FROM cuentas WHERE idCuentas = ?",
        [id]
      );
      res.json(rowSelect[0]);
      return;
    }

    res.status(400).json({ message: "Reviste que los datos ingreseados esten en el formato correcto" });
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateCuentas",
    });
  }
};

export const deleteCuentas = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const queryDelete = "DELETE FROM cuentas WHERE idCuentas = ?";
      const [rows] = await pool.query(queryDelete, [id]);
      if (rows.affectedRows === 0) {
        res.status(404).json({ error: "No se encontro la cuenta a eliminar" });
      } else {
        return res.sendStatus(204);
      }
    }
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en deleteCuentas",
    });
  }
};
