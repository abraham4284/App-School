DELIMITER //

CREATE PROCEDURE EliminarUsuario(
    IN p_idUsuarios INT,
    IN p_idRol INT
)
BEGIN
    DELETE FROM usuarios WHERE idUsuarios = p_idUsuarios AND idRol = p_idRol;
END //

DELIMITER ;
