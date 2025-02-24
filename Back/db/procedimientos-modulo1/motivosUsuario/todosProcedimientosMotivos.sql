DELIMITER //

-- Insertar un nuevo motivo de usuario
CREATE PROCEDURE InsertarMotivoUsuario(
    IN p_tipo VARCHAR(200)
)
BEGIN
    INSERT INTO motivosUsuarios (tipo) VALUES (p_tipo);
    SELECT LAST_INSERT_ID() AS idMotivosUsuarios;
END //

-- Obtener todos los motivos de usuario
CREATE PROCEDURE ObtenerMotivosUsuarios()
BEGIN
    SELECT * FROM motivosUsuarios;
END //

-- Obtener un motivo de usuario por ID
CREATE PROCEDURE ObtenerMotivoUsuarioPorID(IN p_idMotivosUsuarios INT)
BEGIN
    SELECT * FROM motivosUsuarios WHERE idMotivosUsuarios = p_idMotivosUsuarios;
END //

-- Actualizar un motivo de usuario
CREATE PROCEDURE ActualizarMotivoUsuario(
    IN p_idMotivosUsuarios INT,
    IN p_tipo VARCHAR(200)
)
BEGIN
    UPDATE motivosUsuarios
    SET tipo = p_tipo
    WHERE idMotivosUsuarios = p_idMotivosUsuarios;
END //

-- Eliminar un motivo de usuario por ID
CREATE PROCEDURE EliminarMotivoUsuario(IN p_idMotivosUsuarios INT)
BEGIN
    DELETE FROM motivosUsuarios WHERE idMotivosUsuarios = p_idMotivosUsuarios;
END //

DELIMITER ;
