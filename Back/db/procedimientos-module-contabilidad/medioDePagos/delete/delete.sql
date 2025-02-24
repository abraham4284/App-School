DELIMITER $$
CREATE PROCEDURE deleteMedioPago(
 IN p_idMedioDePago INT
)
BEGIN
  DELETE FROM mediodepago WHERE idMedioDePago = p_idMedioDePago;
END $$