DELIMITER $$
CREATE PROCEDURE getIdDetalleCuotasByIdCuotas(
 IN p_idCuotas INT
)
BEGIN
  SELECT * FROM detallecuota WHERE idCuotas = p_idCuotas;
END $$
