CALL CrearUsuario('Apellido', 'Nombre', '123456789', 'username', 'password', 'email@example.com', '12345678', '1990-01-01', '2 años', 'Masculino', 'Activo', '001', 1);
CALL ObtenerUsuarios();
CALL ObtenerUsuarioPorID(7, 1);
CALL ActualizarUsuario(7, 1, 'NuevoApellido', 'NuevoNombre', '987654321', 'newusername', 'newpassword', 'newemail@example.com', '87654321', '1992-01-01', '3 años', 'Femenino', 'Inactivo', '002');
CALL EliminarUsuario(7, 1);
