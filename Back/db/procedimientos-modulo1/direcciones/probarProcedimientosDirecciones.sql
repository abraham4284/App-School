-- Insertar una nueva dirección
CALL InsertarDireccion('1000', 'Av. Siempre Viva', '742', '1', 'A', 'Springfield', 'Buenos Aires', 'Casa de la familia Simpson', 3);

-- Obtener todas las direcciones
CALL ObtenerDirecciones();

-- Obtener una dirección específica
CALL ObtenerDireccionPorID(1);

-- Actualizar una dirección
CALL ActualizarDireccion(1, '1010', 'Av. Falsa', '123', '2', 'B', 'Ciudad Gótica', 'GBA', 'Apartamento nuevo', 3);

-- Eliminar una dirección
CALL EliminarDireccion(1);