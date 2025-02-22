DELIMITER //
-- Eliminar una dirección por ID
CREATE PROCEDURE EliminarDireccion(IN p_idDirecciones INT)
BEGIN
    DELETE FROM direcciones WHERE idDirecciones = p_idDirecciones;
END //

DELIMITER ;