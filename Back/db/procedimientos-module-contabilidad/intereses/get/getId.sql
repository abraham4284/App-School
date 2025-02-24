DELIMITER $$
CREATE PROCEDURE getInteresById(
 IN p_idIntereses INT
)
BEGIN
  SELECT * FROM intereses WHERE idIntereses = p_idIntereses;
END $$