import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loginUserfjbs = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        // Buscar usuario por correo
        const user = await prisma.users.findUnique({
            where: { correo }
        });

        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // Validar contraseña
        const validPassword = await bcrypt.compare(contraseña, user.contraseña);
        if (!validPassword) {
            return res.status(401).json({ msg: "Contraseña incorrecta" });
        }

        // Generar token sin incluir la contraseña
        const token = jwt.sign(
            {
                id: user.id,
                correo: user.correo
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            msg: "Inicio de sesión exitoso",
            token,
            user: {
                id: user.id,
                correo: user.correo
            }
        });
    } catch (error) {
        console.error("Error en loginUserfjbs:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

export const verifyTokenfjbs = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Acceso denegado. No se proporcionó token." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ msg: "Token inválido o expirado." });
    }
};