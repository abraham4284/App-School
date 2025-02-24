DELIMITER $$
CREATE PROCEDURE getMedioPagosById(
 IN p_idMedioDePago INT
)
BEGIN
  SELECT * FROM mediodepago WHERE idMedioDePago = p_idMedioDePago;
END $$