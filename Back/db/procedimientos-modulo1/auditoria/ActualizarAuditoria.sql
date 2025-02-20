DELIMITER $$

CREATE PROCEDURE ActualizarAuditoria(
    IN p_idAuditoria INT,
    IN p_fecha VARCHAR(45),
    IN p_hora VARCHAR(45),
    IN p_tablaAfectada VARCHAR(50),
    IN p_accion VARCHAR(10),
    IN p_idUsuarios INT,
    IN p_username VARCHAR(50)
)
BEGIN
    UPDATE auditoria 
    SET fecha = p_fecha,
        hora = p_hora,
        tablaAfectada = p_tablaAfectada,
        accion = p_accion,
        idUsuarios = p_idUsuarios,
        username = p_username
    WHERE idAuditoria = p_idAuditoria;
END $$

DELIMITER ;