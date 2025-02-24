DELIMITER $$
CREATE PROCEDURE createCuentas(
 IN nombre VARCHAR(255),
 IN CBU_CVU VARCHAR(300),
 IN alias VARCHAR(255)
)
BEGIN
	INSERT INTO cuentas (nombre, CBU_CVU,alias)
    VALUES (nombre, CBU_CVU,alias);
END $$
