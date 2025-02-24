-- Insertar un nuevo motivo de usuario
CALL InsertarMotivoUsuario('duelo');

-- Obtener todos los motivos de usuario
CALL ObtenerMotivosUsuarios();

-- Obtener un motivo específico
CALL ObtenerMotivoUsuarioPorID(1);

-- Actualizar un motivo de usuario
CALL ActualizarMotivoUsuario(1, 'maternidad');

-- Eliminar un motivo de usuario
CALL EliminarMotivoUsuario(1);
