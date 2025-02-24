import { pool } from "../../../db.js";

// Obtener todos los motivos de usuario
export const getMotivos = async (req, res) => {
  try {
    const motivos = await pool.query("CALL ObtenerMotivosUsuarios()");
    res.json(motivos[0]);  // Enviar la lista de motivos
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los motivos de usuario" });
    console.log({ error: error.message });
  }
};

// Crear un nuevo motivo de usuario
export const createMotivo = async (req, res) => {
  try {
    const { tipo } = req.body;
    if (!tipo) {
      return res.status(400).json({ error: "El campo 'tipo' es obligatorio" });
    }

    // Ejecutar el procedimiento almacenado
    await pool.query("CALL InsertarMotivoUsuario(?)", [tipo]);

    // Obtener el ID generado
    const [rows] = await pool.query("SELECT LAST_INSERT_ID() AS idMotivosUsuarios");

    const newMotivo = {
      idMotivosUsuarios: rows[0].idMotivosUsuarios,
      tipo,
    };

    res.status(201).json(newMotivo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el motivo de usuario" });
    console.log({ error: error.message });
  }
};

// Actualizar un motivo de usuario
export const updateMotivo = async (req, res) => {
  try {
    const idMotivosUsuarios = parseInt(req.params.id, 10); // Convertir id a número
    const { tipo } = req.body;

    if (!tipo) {
      return res.status(400).json({ error: "El campo 'tipo' es obligatorio" });
    }

    const query = "CALL ActualizarMotivoUsuario(?, ?)";
    const values = [idMotivosUsuarios, tipo];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el motivo a actualizar" });
    }

    // Consultar el motivo actualizado
    const [rowsSelect] = await pool.query("CALL ObtenerMotivoUsuarioPorID(?)", [idMotivosUsuarios]);
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el motivo de usuario" });
    console.log({ error: error.message });
  }
};

// Eliminar un motivo de usuario
export const deleteMotivo = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "CALL EliminarMotivoUsuario(?)";
    const [rows] = await pool.query(query, [id]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el motivo a eliminar" });
    }

    res.status(204).send(); // Responder con un código de estado 204 (No Content)
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el motivo de usuario" });
    console.log({ error: error.message });
  }
};
