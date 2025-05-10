import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "soloYoSeEstoVato";

export const loginUser_ws = async (req, res) => {
  try {
    const { email_ws, password_ws } = req.body;
    if (!email_ws || !password_ws){
        return res.status(400).json({message: "email y password son requeridos"})
    }
    const user = await prisma.users_ws.findFirst({
      where: { email_ws },
    });

    if (!user) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    const esValida = await bcrypt.compare(password_ws, user.password_ws);
    if (!esValida) {
      return res.status(400).json({ msg: "password incorrecto" });
    }

    const token = jwt.sign(
      { id_ws: user.id_ws, email_ws: user.email_ws },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).json({ msg: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};


export const validarToken_ws = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "Acceso denegado. No hay token." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token inválido" });
  }
};
