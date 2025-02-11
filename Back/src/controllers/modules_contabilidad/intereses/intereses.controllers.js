import { pool } from "../../../db.js";

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
    const { porcentaje, dias } = req.body;

    if (
      typeof porcentaje !== "number" ||
      typeof dias !== "number" ||
      porcentaje <= 0 ||
      dias <= 0
    ) {
      return res.status(400).json({
        message:
          "Los valores de 'porcentaje' y 'dias' deben ser números positivos",
      });
    }

    const queryInsert =
      "INSERT INTO intereses (porcentaje, dias) VALUES (?, ?)";
    const values = [porcentaje, dias];
    const [result] = await pool.query(queryInsert, values);

    const nuevoInteresGuardado = {
      idInteres: result.insertId,
      porcentaje,
      dias,
    };

    res.status(201).json(nuevoInteresGuardado);
  } catch (error) {
    console.error("Error en createIntereses:", error);
    res.status(500).json({
      message: "Error en el servidor al crear interés",
      error: error.message,
    });
  }
};

// Anotacion,

export const updateIntereses = async (req, res) => {
  try {
    const { id } = req.params;
    const { porcentaje, dias } = req.body;
    if (typeof porcentaje === "number" && typeof dias === "number") {
      const queryUpdate =
        "UPDATE intereses SET porcentaje = ?, dias = ? WHERE idIntereses = ?";
      const [rows] = await pool.query(queryUpdate, [porcentaje, dias, id]);

      if (rows.affectedRows === 0) {
        res
          .status(404)
          .json({ message: " No se encontro el interes a actualizar " });
      }
      const [rowSelect] = await pool.query(
        "SELECT * FROM intereses WHERE idIntereses = ?",
        [id]
      );
      res.json(rowSelect[0]);
      return;
    }
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en updateIntereses",
    });
  }
};

export const deleteInteres = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const queryDelete = "DELETE FROM intereses WHERE idIntereses = ?";
      const [rows] = await pool.query(queryDelete, [id]);

      rows.affectedRows === 0
        ? res
            .status(404)
            .json({ error: "No se encontro el interes a eliminar" })
        : res.sendStatus(204);
    } else {
      res.status(404).json({
        message: "Tiene que pasar el id para saber cual dato se eliminara",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en deleteInteres",
    });
  }
};
