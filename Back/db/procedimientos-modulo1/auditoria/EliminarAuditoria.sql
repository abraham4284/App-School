-- Eliminar un registro de auditoria
DELIMITER $$

CREATE PROCEDURE EliminarAuditoria(IN p_idAuditoria INT)
BEGIN
    DELETE FROM auditoria WHERE idAuditoria = p_idAuditoria;
END $$

DELIMITER ;
