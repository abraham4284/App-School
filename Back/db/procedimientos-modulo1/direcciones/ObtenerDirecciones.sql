
DELIMITER //

-- Obtener todas las direcciones
CREATE PROCEDURE ObtenerDirecciones()
BEGIN
    SELECT * FROM direcciones;
END //
DELIMITER ;