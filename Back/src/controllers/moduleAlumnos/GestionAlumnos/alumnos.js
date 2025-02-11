import { pool } from "../../../db.js";

// ✅ Obtener todos los alumnos
export const getAlumnos = async (req, res) => {
  try {
    const [alumnos] = await pool.query("SELECT * FROM alumnos");
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los alumnos" });
    console.log({ error: error.message });
  }
};

// ✅ Crear un nuevo alumno con generación automática de legajo
export const createAlumno = async (req, res) => {
  try {
    const {
      apellidos, nombres, DNI, legajo, fechaNac, observaciones,
      amonestaciones, estado, genero, legHermano, idUsuarios, idCurso
    } = req.body;

    let nuevoLegajo = legajo;

    // 🔹 Si no se proporciona un legajo, generar el siguiente
    if (!legajo || legajo.trim() === "") {
      const [rows] = await pool.query("SELECT IFNULL(MAX(CAST(legajo AS UNSIGNED)), 0) + 1 AS nuevoLegajo FROM alumnos");
      nuevoLegajo = rows[0].nuevoLegajo;
    }

    // 🔹 Insertar en la base de datos
    const [result] = await pool.query(
      `INSERT INTO alumnos 
      (apellidos, nombres, DNI, legajo, fechaNac, observaciones, amonestaciones, 
      estado, genero, legHermano, idUsuarios, idCurso) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [apellidos, nombres, DNI, nuevoLegajo, fechaNac, observaciones, amonestaciones, estado, genero, legHermano, idUsuarios, idCurso]
    );

    res.status(201).json({ message: "Alumno creado correctamente", legajo: nuevoLegajo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Actualizar un alumno
export const updateAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { apellidos, nombres, DNI, legajo, fechaNac, observaciones, amonestaciones, estado, genero, legHermano, idUsuarios, idCurso } = req.body;

    if (!apellidos || !nombres || !DNI || !legajo || !fechaNac || !estado || !genero || !idUsuarios || !idCurso) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const query = `UPDATE alumnos SET apellidos = ?, nombres = ?, DNI = ?, legajo = ?, fechaNac = ?, observaciones = ?, 
                  amonestaciones = ?, estado = ?, genero = ?, legHermano = ?, idUsuarios = ?, idCurso = ? WHERE idAlumnos = ?`;
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

// ✅ Eliminar un alumno
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
