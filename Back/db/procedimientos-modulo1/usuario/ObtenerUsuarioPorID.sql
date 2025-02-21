DELIMITER //

CREATE PROCEDURE ObtenerUsuarioPorID(
    IN p_idUsuarios INT,
    IN p_idRol INT
)
BEGIN
    SELECT * FROM usuarios WHERE idUsuarios = p_idUsuarios AND idRol = p_idRol;
END //

DELIMITER ;
