DELIMITER //

CREATE PROCEDURE CrearUsuario(
    IN p_apellido VARCHAR(100),
    IN p_nombre VARCHAR(100),
    IN p_telefono VARCHAR(45),
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(500),
    IN p_email VARCHAR(100),
    IN p_DNI VARCHAR(45),
    IN p_fechaNac VARCHAR(45),
    IN p_antiguedad VARCHAR(50),
    IN p_genero VARCHAR(45),
    IN p_estado VARCHAR(45),
    IN p_legajo VARCHAR(45),
    IN p_idRol INT
)
BEGIN
    INSERT INTO usuarios (apellido, nombre, telefono, username, password, email, DNI, fechaNac, antiguedad, genero, estado, legajo, idRol)
    VALUES (p_apellido, p_nombre, p_telefono, p_username, p_password, p_email, p_DNI, p_fechaNac, p_antiguedad, p_genero, p_estado, p_legajo, p_idRol);
END //

DELIMITER ;
