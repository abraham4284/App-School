DELIMITER $$

CREATE PROCEDURE ActualizarContacto(
    IN p_idContacto INT,
    IN p_nombre VARCHAR(45),
    IN p_celular VARCHAR(45),
    IN p_email VARCHAR(100),
    IN p_idUsuarios INT
)
BEGIN
    UPDATE contacto 
    SET nombre = p_nombre, 
        celular = p_celular, 
        email = p_email, 
        idUsuarios = p_idUsuarios
    WHERE idContacto = p_idContacto;
END $$

DELIMITER ;
