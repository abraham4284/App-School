DELIMITER $$
CREATE PROCEDURE createMedioPago(
 IN p_tipo VARCHAR(50),
 IN p_idCuentas INT
)
BEGIN
  INSERT INTO mediodepago (tipo,idCuentas) VALUES(p_tipo,p_idCuentas);
END $$