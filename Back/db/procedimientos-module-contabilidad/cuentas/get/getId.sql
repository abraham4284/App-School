DELIMITER $$
CREATE PROCEDURE getCuentasById(
  IN idCuentas INT 
)
BEGIN
	SELECT * FROM cuentas WHERE idCuentas = idCuentas;
END $$
