DELIMITER $$

CREATE PROCEDURE ActualizarLogin(
    IN p_idLogin INT,
    IN p_idUsuarios INT,
    IN p_token VARCHAR(1000),
    IN p_fecha VARCHAR(45),
    IN p_hora VARCHAR(45)
)
BEGIN
    UPDATE login 
    SET token = p_token, fecha = p_fecha, hora = p_hora 
    WHERE idLogin = p_idLogin AND idUsuarios = p_idUsuarios;
END $$

DELIMITER ;
