import { pool } from '../../db.js';  // Asegúrate de que la ruta sea correcta

export const auditoriaMiddleware = async (req, res, next) => {
    try {
        const { method, baseUrl } = req;

       // console.log("Usuario en auditoría:", req.user); // Depuración

        if (!req.user || !req.user.idUsuarios || !req.user.username) {
            console.warn("No hay usuario autenticado en la auditoría.");
            return next(); // No interrumpe la ejecución
        }

        const { idUsuarios, username } = req.user; // Extraemos idUsuarios y username

        let accion = "";
        switch (method) {
            case "GET":
                accion = "SELECT";
                break;
            case "POST":
                accion = "INSERT";
                break;
            case "PUT":
            case "PATCH":
                accion = "UPDATE";
                break;
            case "DELETE":
                accion = "DELETE";
                break;
            default:
                accion = "OTRO";
        }

        await pool.query(
            "INSERT INTO auditoria (fecha, hora, tablaAfectada, accion, idUsuarios, username) VALUES (CURDATE(), CURTIME(), ?, ?, ?, ?)",
            [baseUrl.replace("/", ""), accion, idUsuarios, username]
        );

        next();
    } catch (error) {
        console.error("Error en auditoría:", error.message);
        next();
    }
};
