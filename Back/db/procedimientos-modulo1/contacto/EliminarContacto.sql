DELIMITER $$

CREATE PROCEDURE EliminarContacto(
    IN p_idContacto INT
)
BEGIN
    DELETE FROM contacto WHERE idContacto = p_idContacto;
END $$

DELIMITER ;
