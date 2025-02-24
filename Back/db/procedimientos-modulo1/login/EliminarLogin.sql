DELIMITER $$

CREATE PROCEDURE EliminarLogin(
    IN p_idLogin INT,
    IN p_idUsuarios INT
)
BEGIN
    DELETE FROM login 
    WHERE idLogin = p_idLogin AND idUsuarios = p_idUsuarios;
END $$

DELIMITER ;
