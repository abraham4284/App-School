DELIMITER $$
CREATE PROCEDURE createPagosByCuotas(
 IN p_fechaDelPago VARCHAR(10),
 IN p_montoPag DECIMAL(18,2),
 IN p_estado VARCHAR(50),
 IN p_NOperacion VARCHAR(100),
 IN p_idMedioDePago INT,
 IN p_idDetalleCuota INT
)
BEGIN
  UPDATE detallecuota SET fechaDelPago = p_fechaDelPago, montoPag = p_montoPag, 
  estado = p_estado, NOperacion = p_NOperacion, idMedioDePago = p_idMedioDePago WHERE idDetalleCuota = p_idDetalleCuota;
END $$