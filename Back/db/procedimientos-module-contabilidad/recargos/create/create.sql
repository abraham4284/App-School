DELIMITER $$
CREATE PROCEDURE createRecargosByCuotas(
 IN p_recargo DECIMAL(18,2),
 IN p_valorFinalCuota DECIMAL(18,2),
 IN p_idIntereses INT,
 IN p_idDetalleCuota INT
)
BEGIN
 UPDATE detallecuota SET recargo = p_recargo, valorFinalCuota = p_valorFinalCuota, 
 idIntereses = p_idIntereses WHERE idDetalleCuota = p_idDetalleCuota;
END $$