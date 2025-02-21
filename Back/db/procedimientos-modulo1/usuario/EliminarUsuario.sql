DELIMITER //

CREATE PROCEDURE EliminarUsuario(IN p_idUsuarios INT)
BEGIN
    DELETE FROM usuarios WHERE idUsuarios = p_idUsuarios;
END //

DELIMITER ;
