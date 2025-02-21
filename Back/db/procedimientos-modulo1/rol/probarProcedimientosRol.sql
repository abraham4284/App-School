CALL CrearRol('Supervisor');
CALL ActualizarRol(2, 'Usuario Básico');
CALL EliminarRol(3); -- Elimina el rol con ID 3
CALL ObtenerRoles();
CALL ObtenerRolPorID(1);

use schooldb;