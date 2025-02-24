DELIMITER //
CREATE PROCEDURE ObtenerDireccionPorID(IN p_idDirecciones INT)
BEGIN
    SELECT * FROM direcciones WHERE idDirecciones = p_idDirecciones;
END //
DELIMITER ;