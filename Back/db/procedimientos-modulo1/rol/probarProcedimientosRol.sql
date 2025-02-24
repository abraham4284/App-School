CALL CrearRol('Supervisor');
CALL ActualizarRol(8, 'Usuario Básico');
CALL EliminarRol(8); -- Elimina el rol con ID 
CALL ObtenerRoles();
CALL ObtenerRolPorID(1);

use schooldb;