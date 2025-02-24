DELIMITER $$

CREATE PROCEDURE ActualizarRol(
    IN p_idRol INT,
    IN p_nombre VARCHAR(50)
)
BEGIN
    UPDATE rol 
    SET nombre = p_nombre 
    WHERE idRol = p_idRol;
END $$

DELIMITER ;
