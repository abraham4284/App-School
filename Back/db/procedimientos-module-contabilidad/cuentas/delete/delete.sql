DELIMITER $$
CREATE PROCEDURE deleteCuentas(
 IN p_idCuentas VARCHAR(255),
)
BEGIN
	DELETE FROM cuentas WHERE idCuentas = p_idCuentas;
END $$
