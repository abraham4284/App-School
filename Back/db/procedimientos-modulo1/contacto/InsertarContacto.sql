DELIMITER $$

CREATE PROCEDURE InsertarContacto(
    IN p_nombre VARCHAR(45),
    IN p_celular VARCHAR(45),
    IN p_email VARCHAR(100),
    IN p_idUsuarios INT
)
BEGIN
    INSERT INTO contacto (nombre, celular, email, idUsuarios)
    VALUES (p_nombre, p_celular, p_email, p_idUsuarios);
    
    --  Devolver el último ID insertado
    SELECT LAST_INSERT_ID() AS idContacto;
END $$

DELIMITER ;
