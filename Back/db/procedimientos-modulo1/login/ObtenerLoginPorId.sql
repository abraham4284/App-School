DELIMITER $$

CREATE PROCEDURE ObtenerLoginPorId(
    IN p_idUsuarios INT
)
BEGIN
    SELECT * FROM login WHERE idUsuarios = p_idUsuarios;
END $$

DELIMITER ;

