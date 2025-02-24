DELIMITER $$
CREATE PROCEDURE updateIntereses(
 IN p_porcentaje DECIMAL(18,2),
 IN p_dias INT,
 IN p_idIntereses INT
)
BEGIN
  UPDATE intereses SET porcentaje = p_porcentaje, dias = p_dias WHERE idIntereses = p_idIntereses;
END $$