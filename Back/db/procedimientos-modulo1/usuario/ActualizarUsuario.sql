DELIMITER //

CREATE PROCEDURE ActualizarUsuario(
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
    IN p_idRol INT,
    IN p_idUsuarios INT
)
BEGIN
     UPDATE usuarios
    SET 
        apellido = p_apellido,
        nombre = p_nombre,
        telefono = p_telefono,
        username = p_username,
        password = p_password,
        email = p_email,
        DNI = p_DNI,
        fechaNac = p_fechaNac,
        antiguedad = p_antiguedad,
        genero = p_genero,
        estado = p_estado,
        legajo = p_legajo,
        idRol = p_idRol
    WHERE idUsuarios = p_idUsuarios;
END //

DELIMITER ;
