DELIMITER $$
CREATE PROCEDURE updateMedioPago(
 IN p_tipo VARCHAR(50),
 IN p_idMedioDePago INT
)
BEGIN
  UPDATE mediodepago SET tipo = p_tipo WHERE idMedioDePago = p_idMedioDePago;
END $$