import { pool } from "../../../db.js";


// get
export const getAlumnos = async (req, res) => {
  try {
    const alumnos = await pool.query("SELECT * FROM alumnos");
    res.json(alumnos[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los alumnos" });
    console.log({ error: error.message });
  }
};

//create

export const createAlumno = async (req, res) => {
  try {
      const {
          apellidos, nombres, DNI, legajo, fechaNac, observaciones,
          amonestaciones, estado, genero, legHermano, idUsuarios, idCurso, idTutor
      } = req.body;

      // Insertar el nuevo alumno
      const [result] = await pool.query(
          `INSERT INTO alumnos 
          (apellidos, nombres, DNI, legajo, fechaNac, observaciones, amonestaciones, 
          estado, genero, legHermano, idUsuarios, idCurso) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [apellidos, nombres, DNI, legajo, fechaNac, observaciones, amonestaciones, estado, genero, legHermano, idUsuarios, idCurso]
      );


      res.status(201).json({ message: "Alumno creado correctamente", id: idAlumnos });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
  
//update
export const updateAlumno = async (req, res) => {
    try {
      const { id } = req.params;
      const { apellidos, nombres, DNI, legajo, fechaNac, observaciones, amonestaciones, estado, genero, legHermano, idUsuarios, idCurso } = req.body;
  
      if (!apellidos || !nombres || !DNI || !legajo || !fechaNac || !estado || !genero || !idUsuarios || !idCurso) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }
  
      const query = "UPDATE alumnos SET apellidos = ?, nombres = ?, DNI = ?, legajo = ?, fechaNac = ?, observaciones = ?, amonestaciones = ?, estado = ?, genero = ?, legHermano = ?, idUsuarios = ?, idCurso = ? WHERE idAlumnos = ?";
      const values = [apellidos, nombres, DNI, legajo, fechaNac, observaciones, amonestaciones, estado, genero, legHermano, idUsuarios, idCurso, id];
      const [rows] = await pool.query(query, values);
  
      if (rows.affectedRows === 0) {
        return res.status(404).json({ error: "No se encontró el alumno a actualizar" });
      }
  
      const [rowsSelect] = await pool.query("SELECT * FROM alumnos WHERE idAlumnos = ?", [id]);
      res.json(rowsSelect[0]);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el alumno" });
      console.log({ error: error.message });
    }
  };
  
//delete
export const deleteAlumno = async (req, res) => {
    try {
      const { id } = req.params;
      const query = "DELETE FROM alumnos WHERE idAlumnos = ?";
      const [rows] = await pool.query(query, [id]);
  
      if (rows.affectedRows === 0) {
        return res.status(404).json({ error: "No se encontró el alumno a eliminar" });
      }
  
      res.status(200).json({ message: "Alumno eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el alumno" });
      console.log({ error: error.message });
    }
  };
  