CALL InsertarContacto('Juan Pérez', '123456789', 'juan.perez@email.com', 1);
CALL ObtenerContactos();
CALL ObtenerContactoPorID(3);
CALL ActualizarContacto(3, 'Juan Pérez Modificado', '987654321', 'juan.modificado@email.com', 1);
CALL EliminarContacto(3);
