DELIMITER $$
CREATE PROCEDURE createDetalleCuotas(
 IN p_numCuota INT,
 IN p_montoUnitario DECIMAL(18,2),
 IN p_fechaInicio VARCHAR(10),
 IN p_fechaVto VARCHAR(10),
 IN p_estado VARCHAR(50),
 IN p_idCuotas INT
 
)
BEGIN
 INSERT INTO detalleCuota (numCuota,montoUnitario,fechaInicio, fechaVto, estado, idCuotas)
  VALUES (p_numCuota,p_montoUnitario,p_fechaInicio,p_fechaVto,p_estado,p_idCuotas);
END $$
