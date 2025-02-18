import { pool } from "../../../db.js";

// ✅ Obtener todas las notas
export const getNotas = async (req, res) => {
  try {
    const [notas] = await pool.query("SELECT * FROM notas");
    res.json(notas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las notas" });
    console.log({ error: error.message });
  }
};

// ✅ Crear una nueva nota
export const createNota = async (req, res) => {
  try {
    const { calificacion, fecha, hora, idperiodosAcademicos, idMaterias, idUsuarios, idAlumnos, idCurso, idevaluciones } = req.body;

    if (!calificacion || !fecha || !hora || !idperiodosAcademicos || !idMaterias || !idUsuarios || !idAlumnos || !idCurso || !idevaluciones) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const query = `INSERT INTO notas (calificacion, fecha, hora, idperiodosAcademicos, idMaterias, idUsuarios, idAlumnos, idCurso, idevaluciones) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [calificacion, fecha, hora, idperiodosAcademicos, idMaterias, idUsuarios, idAlumnos, idCurso, idevaluciones];

    const [result] = await pool.query(query, values);
    res.status(201).json({ message: "Nota creada correctamente", idNotas: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Actualizar una nota
export const updateNota = async (req, res) => {
  try {
    const { id } = req.params;
    const { calificacion, fecha, hora, idperiodosAcademicos, idMaterias, idUsuarios, idAlumnos, idCurso, idevaluciones } = req.body;

    if (!calificacion || !fecha || !hora || !idperiodosAcademicos || !idMaterias || !idUsuarios || !idAlumnos || !idCurso || !idevaluciones) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const query = `UPDATE notas SET calificacion = ?, fecha = ?, hora = ?, idperiodosAcademicos = ?, idMaterias = ?, 
                  idUsuarios = ?, idAlumnos = ?, idCurso = ?, idevaluciones = ? WHERE idNotas = ?`;
    const values = [calificacion, fecha, hora, idperiodosAcademicos, idMaterias, idUsuarios, idAlumnos, idCurso, idevaluciones, id];

    const [rows] = await pool.query(query, values);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró la nota a actualizar" });
    }

    const [rowsSelect] = await pool.query("SELECT * FROM notas WHERE idNotas = ?", [id]);
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la nota" });
    console.log({ error: error.message });
  }
};

// ✅ Eliminar una nota
export const deleteNota = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM notas WHERE idNotas = ?";
    const [rows] = await pool.query(query, [id]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró la nota a eliminar" });
    }

    res.status(200).json({ message: "Nota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la nota" });
    console.log({ error: error.message });
  }
};
