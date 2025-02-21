DELIMITER $$

CREATE PROCEDURE ObtenerLoginPorId(
    IN p_idLogin INT,
    IN p_idUsuarios INT
)
BEGIN
    SELECT * FROM login WHERE idLogin = p_idLogin AND idUsuarios = p_idUsuarios;
END $$

DELIMITER ;
