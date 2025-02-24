DELIMITER $$
CREATE PROCEDURE updateCuotasByRecargos(
 IN p_total DECIMAL(18,2),
 IN p_idCuotas INT
)
BEGIN
UPDATE cuotas SET total = p_total WHERE idCuotas = p_idCuotas;
END $$