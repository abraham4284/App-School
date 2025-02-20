DELIMITER $$

CREATE PROCEDURE InsertarAuditoria(
    IN p_fecha VARCHAR(45),
    IN p_hora VARCHAR(45),
    IN p_tablaAfectada VARCHAR(50),
    IN p_accion VARCHAR(10),
    IN p_idUsuarios INT,
    IN p_username VARCHAR(50)
)
BEGIN
    INSERT INTO auditoria (fecha, hora, tablaAfectada, accion, idUsuarios, username)
    VALUES (p_fecha, p_hora, p_tablaAfectada, p_accion, p_idUsuarios, p_username);
END $$

DELIMITER ;