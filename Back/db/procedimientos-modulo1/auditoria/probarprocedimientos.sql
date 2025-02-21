CALL InsertarAuditoria('2025-02-20', '14:20:20', 'tablaEjemplo', 'INSERT', 1, 'usuarioEjemplo');
CALL ObtenerAuditoria();
CALL ObtenerAuditoriaPorID(10);  -- Reemplaza 1 con el ID del registro que deseas obtener
CALL ActualizarAuditoria(10, '2025-02-21', '15:00:00', 'tablaActualizada', 'UPDATE', 1, 'usuarioActualizado');
CALL EliminarAuditoria(1);  -- Reemplaza 1 con el ID del registro que deseas eliminar
