import { pool } from "../../db.js";

// Obtener todos los tutores
export const getTutores = async (req, res) => {
  try {
    const tutores = await pool.query("SELECT * FROM tutor");
    res.json(tutores[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tutores" });
    console.log({ error: error.message });
  }
};

// Crear un nuevo tutor
export const createTutor = async (req, res) => {
  try {
      const { nombre, apellido, DNI, fechaNac, observaciones, genero, idAlumnos, idCurso, idUsuarios } = req.body;

      // Insertar el nuevo tutor
      const [result] = await pool.query(
          `INSERT INTO tutor (nombre, apellido, DNI, fechaNac, observaciones, genero) 
          VALUES (?, ?, ?, ?, ?, ?)`,
          [nombre, apellido, DNI, fechaNac, observaciones, genero]
      );

      const idTutor = result.insertId;

      // Insertar en la tabla intermedia tutoalumnos (si hay un alumno asignado)
      if (idAlumnos) {
          await pool.query(
              "INSERT INTO tutoalumnos (idTutor, idAlumnos, idUsuarios, idCurso) VALUES (?, ?, ?, ?)",
              [idTutor, idAlumnos, idUsuarios, idCurso]
          );
      }

      res.status(201).json({ message: "Tutor creado correctamente", id: idTutor });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Actualizar un tutor
export const updateTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, DNI, fechaNac, observaciones, genero } = req.body;

    if (!nombre || !apellido || !DNI || !fechaNac) {
      return res.status(400).json({ error: "Campos obligatorios faltantes" });
    }

    const query = "UPDATE tutor SET nombre = ?, apellido = ?, DNI = ?, fechaNac = ?, observaciones = ?, genero = ? WHERE idTutor = ?";
    const values = [nombre, apellido, DNI, fechaNac, observaciones, genero, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el tutor a actualizar" });
    }

    const [rowsSelect] = await pool.query("SELECT * FROM tutor WHERE idTutor = ?", [id]);
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el tutor" });
    console.log({ error: error.message });
  }
};

// Eliminar un tutor
export const deleteTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM tutor WHERE idTutor = ?";
    const [rows] = await pool.query(query, [id]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el tutor a eliminar" });
    }

    res.status(200).json({ message: "Tutor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el tutor" });
    console.log({ error: error.message });
  }
};
