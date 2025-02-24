DELIMITER //

-- Insertar una nueva dirección
CREATE PROCEDURE InsertarDireccion(
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
    INSERT INTO direcciones (codigoPostal, calle, numero, piso, departamento, localidad, provincia, descripcion, idUsuarios)
    VALUES (p_codigoPostal, p_calle, p_numero, p_piso, p_departamento, p_localidad, p_provincia, p_descripcion, p_idUsuarios);
    
    SELECT LAST_INSERT_ID() AS idDireccion;
END //
DELIMITER ;



