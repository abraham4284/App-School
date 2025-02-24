-- Obtener un registro específico por idAuditoria
DELIMITER $$

CREATE PROCEDURE ObtenerAuditoriaPorID(IN p_idAuditoria INT)
BEGIN
    SELECT * FROM auditoria WHERE idAuditoria = p_idAuditoria;
END $$

DELIMITER ;
