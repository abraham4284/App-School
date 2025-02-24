DELIMITER //
-- Actualizar una dirección
CREATE PROCEDURE ActualizarDireccion(
    IN p_idDirecciones INT,
    IN p_codigoPostal VARCHAR(10),
    IN p_calle VARCHAR(100),
    IN p_numero VARCHAR(10),
    IN p_piso VARCHAR(2),
    IN p_departamento VARCHAR(3),
    IN p_localidad VARCHAR(100),
    IN p_provincia VARCHAR(50),
    IN p_descripcion VARCHAR(600),
    IN p_idUsuarios INT
)
BEGIN
    UPDATE direcciones
    SET codigoPostal = p_codigoPostal,
        calle = p_calle,
        numero = p_numero,
        piso = p_piso,
        departamento = p_departamento,
        localidad = p_localidad,
        provincia = p_provincia,
        descripcion = p_descripcion,
        idUsuarios = p_idUsuarios
    WHERE idDirecciones = p_idDirecciones;
END //
DELIMITER ;