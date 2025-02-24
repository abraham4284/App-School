DELIMITER $$

CREATE PROCEDURE createCuotas(
  IN p_anio VARCHAR(45),
  IN p_cantidadCuotas INT,
  IN p_monto DECIMAL(18,2),
  IN p_total DECIMAL(18,2),
  IN p_idUsuarios INT,
  IN p_idRol INT,
  IN p_idAlumnos INT,
  OUT p_idCuotas INT  
)
BEGIN
  INSERT INTO cuotas (anio, cantidadCuotas, monto, total, idUsuarios, idRol, idAlumnos)
  VALUES (p_anio, p_cantidadCuotas, p_monto, p_total, p_idUsuarios, p_idRol, p_idAlumnos);

  SET p_idCuotas = LAST_INSERT_ID();  
END $$

DELIMITER ;
