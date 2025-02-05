import { pool } from "../../db.js"; 

export const getCursos = async (req, res) => {
  try {
    const cursos = await pool.query("SELECT * FROM curso");
    res.json(cursos[0]);  
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los cursos" });
    console.log({ error: error.message });
  }
};

export const createCurso = async (req, res) => {
  try {
      const { nombre, idNiveles, idOrientaciones, idTurnos, idMaterias, idUsuarios, idRol } = req.body;

      // Insertar el nuevo curso
      const [result] = await pool.query(
          "INSERT INTO curso (nombre, idNiveles, idOrientaciones, idTurnos) VALUES (?, ?, ?, ?)",
          [nombre, idNiveles, idOrientaciones, idTurnos]
      );

      const idCurso = result.insertId;

      // Insertar en la tabla intermedia cursosmateria (si hay materias asignadas)
      await pool.query(
        "INSERT INTO cursosmateria (idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias, idUsuarios, idRol) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias, idUsuarios, idRol]
    );

      res.status(201).json({ message: "Curso creado correctamente", id: idCurso });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


export const updateCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, idNiveles, idOrientaciones, idTurnos } = req.body;

    if (!nombre || !idNiveles || !idOrientaciones || !idTurnos) {
      return res.status(400).json({ error: "Los campos 'nombre', 'idNiveles', 'idOrientaciones', 'idTurnos' son obligatorios" });
    }

    const query = "UPDATE curso SET nombre = ?, idNiveles = ?, idOrientaciones = ?, idTurnos = ? WHERE idCurso = ?";
    const values = [nombre, idNiveles, idOrientaciones, idTurnos, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el curso a actualizar" });
    }

    const [updatedCurso] = await pool.query("SELECT * FROM curso WHERE idCurso = ?", [id]);
    res.json(updatedCurso[0]);  // Devuelve el curso actualizado
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el curso" });
    console.log({ error: error.message });
  }
};

export const deleteCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM curso WHERE idCurso = ?";
    const [rows] = await pool.query(query, [id]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el curso a eliminar" });
    }

    res.status(200).json({ message: "Curso eliminado correctamente" });  
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el curso" });
    console.log({ error: error.message });
  }
};
