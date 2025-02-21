DELIMITER //

CREATE PROCEDURE ObtenerUsuarioPorID(IN p_idUsuarios INT)
BEGIN
    SELECT * FROM usuarios WHERE idUsuarios = p_idUsuarios;
END //

DELIMITER ;
