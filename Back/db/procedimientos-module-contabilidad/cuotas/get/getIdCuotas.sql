DELIMITER $$
CREATE PROCEDURE getIdCuotas(
 IN p_idCuotas INT
)
BEGIN
  SELECT * FROM cuotas WHERE idCuotas = p_idCuotas;
END $$