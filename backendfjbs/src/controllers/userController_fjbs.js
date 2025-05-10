import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const getUser_ws = async (req, res)=>{
    try{
        const users_ws = await prisma.users_ws.findMany();
        if(users_ws){
            res.status(200).json(users_ws);
        }else{
            res.status(404).json({msg: "Error al obtener usuarios"});
        }
    }catch (error){
        console.error(error);
        res.status(500).json({msg: "Error en el servidor"});
    }
};

export const getUserId_ws = async (req, res)=>{
    try{
        const {id_ws} = req.params;
        const users_ws = await prisma.users_ws.findUnique({
            where: {id_ws: parseInt(id_ws)},
        });
        
        if(users_ws){
            res.status(200).json(users_ws);
        } else{
            res.status(404).json({msg: "Error al obtener usuario"});
        }
    } catch (error){
        console.error(error);
        res.status(500).json({msg: "Error en el servidor"});
    }
};

export const createUser_ws = async(req, res)=>{
    try{
        const {fullname_ws, email_ws, password_ws} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password_ws, salt);
        const users_ws = await prisma.users_ws.create({
            data: {fullname_ws, email_ws, password_ws: hashPassword},
        });

        if(users_ws){
            res.status(200).json({msg: "User registrado correctamente", user: users_ws})
        } else{
            res.status(404).json({msg: "Error al registrar un user"})
        }
        
    }catch (error){
        console.error(error);
        res.status(500).json({msg: "Error en el servidor"});
    }
};

export const updateUserId_ws = async(req, res)=>{
    try{
        const id_ws = parseInt(req.params.id_ws);
        const {fullname_ws, email_ws, password_ws} = req.body;
        let updateData = { fullname_ws, email_ws };
        if (password_ws) {
          const salt = await bcrypt.genSalt(10);
          updateData.password_ws = await bcrypt.hash(password_ws, salt);
        }

        const users_ws = await prisma.users_ws.update({
          where: { id_ws: parseInt(id_ws) }, 
          data: updateData,
        });

        if(users_ws){
            res.status(200).json({msg: "User actualizado correctamente", user: users_ws})
        }else{
            res.status(404).json({msg: "Error al actulizar user"})
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    } 
};

export const deleteUserId_ws = async (req, res) => {
    try {
      const { id_ws } = req.params;
      await prisma.users_ws.delete({
        where: { id_ws: parseInt(id_ws) }, 
      });
  
      res.status(200).json({ msg: "usuario eliminado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  };