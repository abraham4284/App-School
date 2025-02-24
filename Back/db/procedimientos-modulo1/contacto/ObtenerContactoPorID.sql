DELIMITER $$

CREATE PROCEDURE ObtenerContactoPorID(
    IN p_idContacto INT
)
BEGIN
    SELECT * FROM contacto WHERE idContacto = p_idContacto;
END $$

DELIMITER ;