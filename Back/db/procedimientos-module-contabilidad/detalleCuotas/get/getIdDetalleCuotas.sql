DELIMITER $$
CREATE PROCEDURE getIdDetalleCuotas(
 IN p_idDetalleCuota INT
)
BEGIN
  SELECT * FROM detallecuota WHERE idDetalleCuota = p_idDetalleCuota;
END $$