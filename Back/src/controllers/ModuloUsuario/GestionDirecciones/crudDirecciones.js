import { pool } from "../../../db.js";

export const getDirecciones = async (req, res) => {
  try {
    const direcciones = await pool.query('CALL ObtenerDirecciones()');
    res.json(direcciones[0]); // Responder con la lista de direcciones
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las direcciones" });
    console.log({ error: error.message });
  }
};

export const createDireccion = async (req, res) => {
  try {
    const { codigoPostal, calle, numero, piso, departamento, localidad, provincia, descripcion, idUsuarios } = req.body;

    // Validación de campos obligatorios
    if (!codigoPostal || !calle || !numero || !localidad || !provincia || !idUsuarios) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben ser completados." });
    }

    const query =' CALL InsertarDireccion(?, ?, ?, ?, ?, ?, ?, ?, ?);';

    const values = [codigoPostal, calle, numero, piso, departamento, localidad, provincia, descripcion, idUsuarios];

    const [result] = await pool.query(query, values);

    const newDireccion = {
      idDirecciones: result.insertId,
      codigoPostal, calle, numero, piso, departamento, localidad, provincia, descripcion, idUsuarios
    };

    res.status(201).json(newDireccion);

  } catch (error) {
    res.status(500).json({ error: "Error al crear la dirección" });
    console.log({ error: error.message });
  }
};

export const updateDireccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigoPostal, calle, numero, piso, departamento, localidad, provincia, descripcion, idUsuarios } = req.body;
    const idDirecciones = parseInt(req.params.id, 10);
    // Verificar si la dirección existe
    const [direccionExists] = await pool.query('CALL ObtenerDireccionPorID(?)', [idDirecciones]);

    if (direccionExists.length === 0) {
      return res.status(404).json({ error: "Dirección no encontrada" });
    }

    const query = 'CALL ActualizarDireccion(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const values = [idDirecciones, codigoPostal, calle, numero, piso, departamento, localidad, provincia, descripcion, idUsuarios];

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se pudo actualizar la dirección" });
    }

    // Obtener la dirección actualizada
    const [updatedDireccion] = await pool.query('CALL ObtenerDireccionPorID(?)',[idDirecciones]);
    
    res.json(updatedDireccion[0]);

  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la dirección" });
    console.log({ error: error.message });
  }
};

export const deleteDireccion = async (req, res) => {
  try {
    const { id } = req.params;
    const idDirecciones = parseInt(req.params.id, 10);
    // Verificar si la dirección existe
    const [direccionExists] = await pool.query('CALL ObtenerDireccionPorID(?)', [idDirecciones]);

    if (direccionExists.length === 0) {
      return res.status(404).json({ error: "Dirección no encontrada" });
    }

    // Eliminar dirección
    const [result] = await pool.query('CALL EliminarDireccion(?)', [idDirecciones]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se pudo eliminar la dirección" });
    }

    res.status(204).send(); // Responde con código 204 (No Content) si se eliminó correctamente

  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la dirección" });
    console.log({ error: error.message });
  }
};
