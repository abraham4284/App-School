import { pool } from "../../db.js";

export const getMaterias = async (req, res) => {
  try {
    const materias = await pool.query("SELECT * FROM materias");
    res.json(materias[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las materias" });
  }
};

export const createMateria = async (req, res) => {
  try {
      const { nombre, valorMinimo, nota, idCurso, idNiveles, idOrientaciones, idTurnos, idUsuarios, idRol } = req.body;

      // Insertar la nueva materia
      const [result] = await pool.query(
          "INSERT INTO materias (nombre, valorMinimo, nota) VALUES (?, ?, ?)",
          [nombre, valorMinimo, nota]
      );

      const idMaterias = result.insertId;

      // Insertar en la tabla intermedia cursosmateria
      // await pool.query(
      //     "INSERT INTO cursosmateria (idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias, idUsuarios, idRol) VALUES (?, ?, ?, ?, ?, ?, ?)",
      //     [idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias, idUsuarios, idRol]
      // );

      res.status(201).json({ message: "Materia creada correctamente", id: idMaterias });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


export const updateMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, valorMinimo, nota } = req.body;
    const query = "UPDATE materias SET nombre = ?, valorMinimo = ?, nota = ? WHERE idMaterias = ?";
    const values = [nombre, valorMinimo, nota, id];
    const [rows] = await pool.query(query, values);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Materia no encontrada" });
    }
    const [updatedMateria] = await pool.query("SELECT * FROM materias WHERE idMaterias = ?", [id]);
    res.json(updatedMateria[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la materia" });
  }
};

export const deleteMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM materias WHERE idMaterias = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Materia no encontrada" });
    }
    res.status(200).json({ message: "Materia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la materia" });
  }
};
