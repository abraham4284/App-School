CALL InsertarLogin('token_de_ejemplo', '2025-02-20', '12:00:00', 1);  -- Reemplaza 1 con el ID correspondiente de usuarios
CALL ObtenerLogins();
CALL ObtenerLoginPorId(5, 1);  -- Reemplaza 1 con el idLogin y el idUsuarios que desees buscar
CALL ActualizarLogin(5, 1, 'nuevo_token', '2025-02-20', '14:00:00');  -- Reemplaza los valores según necesites
CALL EliminarLogin(5, 1);  -- Reemplaza 1 con el ID correspondiente
