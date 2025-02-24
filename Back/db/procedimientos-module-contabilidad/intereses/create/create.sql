DELIMITER $$
CREATE PROCEDURE createIntereses(
 IN p_porcentaje DECIMAL(18,2),
 IN p_dias INT
)
BEGIN
  INSERT INTO intereses (porcentaje, dias) VALUES (p_porcentaje, p_dias);
END $$
