DELIMITER $$

CREATE PROCEDURE InsertarLogin(
    IN token VARCHAR(1000),
    IN fecha VARCHAR(45),
    IN hora VARCHAR(45),
    IN idUsuarios INT
)
BEGIN
    INSERT INTO login (token, fecha, hora, idUsuarios) VALUES (token, fecha, hora, idUsuarios);
END $$

DELIMITER ;
