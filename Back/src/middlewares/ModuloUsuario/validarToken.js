import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../../config.js';

export const validarToken = (rolesPermitidos) => {
    return (req, res, next) => {
        //console.log("Token recibido:", req.cookies.token);
      try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ message: 'Token no autorizado' });
  
        jwt.verify(token, TOKEN_SECRET, (error, user) => {
          if (error) return res.status(500).send('Token inválido');
  
          req.user = user; // 🔹 Asegurar que req.user se asigna antes de la validación de roles
          //console.log("Usuario validado:", req.user);
  
          if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).send('No tienes permisos');
          }
  
          next();
        });
      } catch (error) {
        console.log("Error en la validación del token:", error);
        res.status(500).json({ error: "Error en la autenticación" });
      }
    };
  };
