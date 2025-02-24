import { pool } from "../../../db.js";

// Obtener todas las asistencias
export const getAsistencias = async (req, res) => {
  try {
    const [rows] = await pool.query("CALL ObtenerAsistencias()");
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener asistencias" });
    console.log({ error: error.message });
  }
};

// Crear una asistencia
export const createAsistencia = async (req, res) => {
  try {
    // Asegúrate de que los nombres de los campos son correctos
    const { estado, justificado, fecha, hora, idAlumnos, idMotivosUsuarios } = req.body;

    // Verifica que todos los campos obligatorios están presentes
    if (!estado ||  !fecha || !hora || !idAlumnos || !idMotivosUsuarios) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben ser completados." });
    }

    // Llama al procedimiento almacenado
    const query = 'CALL CrearAsistencia(?, ?, ?, ?, ?, ?, @last_id)';
    const values = [estado, justificado, fecha, hora, idAlumnos, idMotivosUsuarios];
    
    await pool.query(query, values);

    // Obtiene el último ID insertado
    const [result] = await pool.query('SELECT @last_id AS last_id');
    const newAsistencia = { 
      idregistroAsistenciaAlumnos: result[0].last_id, 
      estado, 
      justificado, 
      fecha, 
      hora, 
      idAlumnos, 
      idMotivosUsuarios 
    };
    
    res.status(201).json(newAsistencia);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la asistencia" });
    console.log({ error: error.message });
  }
};


// Actualizar una asistencia
export const updateAsistencia = async (req, res) => {
  try {
    const idregistroAsistenciaUsuarios = parseInt(req.params.id, 10);
    const { estado, justificado, fecha, hora, idUsuarios, idMotivosUsuarios } = req.body;

    if (!estado || !fecha || !hora || !idUsuarios || !idMotivosUsuarios) {
      return res.status(400).json({ error: "Todos los campos son obligatorios excepto 'justificado'" });
    }

    const [rows] = await pool.query(
      "CALL ActualizarAsistencia(?, ?, ?, ?, ?, ?, ?)",
      [idregistroAsistenciaUsuarios, estado, justificado || "", fecha, hora, idUsuarios, idMotivosUsuarios]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró la asistencia a actualizar" });
    }

    // Consultar la asistencia actualizada
    const [rowsSelect] = await pool.query("CALL ObtenerAsistenciaPorID(?)", [idregistroAsistenciaUsuarios]);
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la asistencia" });
    console.log({ error: error.message });
  }
};

// Eliminar una asistencia
export const deleteAsistencia = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("CALL EliminarAsistencia(?)", [id]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró la asistencia a eliminar" });
    }

    res.status(204).send();  // Responder con 204 (No Content)
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la asistencia" });
    console.log({ error: error.message });
  }
};
