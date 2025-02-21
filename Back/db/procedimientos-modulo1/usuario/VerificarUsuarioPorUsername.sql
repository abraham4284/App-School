DELIMITER //

CREATE PROCEDURE VerificarUsuarioPorUsername(IN p_username VARCHAR(50))
BEGIN
    SELECT * FROM usuarios WHERE username = p_username;
END //

DELIMITER ;
