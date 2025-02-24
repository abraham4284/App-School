DELIMITER $$
CREATE PROCEDURE updateCuentas(
 IN idCuentas INT,
 IN nombre VARCHAR(255),
 IN CBU_CVU VARCHAR(300),
 IN alias VARCHAR(255)
)
BEGIN
 UPDATE cuentas SET nombre = nombre, CBU_CVU = CBU_CVU, alias = alias
 WHERE idCuentas = idCuentas;
END $$