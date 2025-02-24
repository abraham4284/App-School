DELIMITER $$

CREATE PROCEDURE ObtenerAsistencias()
BEGIN
    SELECT * FROM presenciausuarios;
END $$

DELIMITER ;
DELIMITER $$

CREATE PROCEDURE ObtenerAsistenciaPorID(IN p_id INT)
BEGIN
    SELECT * FROM presenciausuarios WHERE idregistroAsistenciaUsuarios = p_id;
END $$

DELIMITER ;
DELIMITER $$

DELIMITER $$

CREATE PROCEDURE CrearAsistencia(
    IN p_estado VARCHAR(45),
    IN p_justificado VARCHAR(45),
    IN p_fecha VARCHAR(45),
    IN p_hora VARCHAR(45),
    IN p_idUsuarios INT,
    IN p_idMotivosUsuarios INT,
    OUT p_last_id INT
)
BEGIN
    INSERT INTO presenciausuarios (estado, justificado, fecha, hora, idUsuarios, idMotivosUsuarios)
    VALUES (p_estado, p_justificado, p_fecha, p_hora, p_idUsuarios, p_idMotivosUsuarios);
    
    SET p_last_id = LAST_INSERT_ID();
END $$

DELIMITER ;


CREATE PROCEDURE ActualizarAsistencia(
    IN p_id INT,
    IN p_estado VARCHAR(45),
    IN p_justificado VARCHAR(45),
    IN p_fecha VARCHAR(45),
    IN p_hora VARCHAR(45),
    IN p_idUsuarios INT,
    IN p_idMotivosUsuarios INT
)
BEGIN
    UPDATE presenciausuarios
    SET estado = p_estado,
        justificado = p_justificado,
        fecha = p_fecha,
        hora = p_hora,
        idUsuarios = p_idUsuarios,
        idMotivosUsuarios = p_idMotivosUsuarios
    WHERE idregistroAsistenciaUsuarios = p_id;
END $$

DELIMITER ;
DELIMITER $$

CREATE PROCEDURE EliminarAsistencia(IN p_id INT)
BEGIN
    DELETE FROM presenciausuarios WHERE idregistroAsistenciaUsuarios = p_id;
END $$

DELIMITER ;

