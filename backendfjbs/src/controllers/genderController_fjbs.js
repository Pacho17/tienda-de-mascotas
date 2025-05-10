import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGender_ws = async(req, res)=>{
    try{
        const genders_ws = await prisma.genders_ws.findMany();
        if(genders_ws) {
            res.status(200).json(genders_ws)
        } else {
            res.status(400).json({msg: "Error al obtener genders"});
        }
    }catch (error){
        console.error(error);
        res.status(500).json({msg: "Error en el servidor"})
    }
};

export const getGenderId_ws = async (req, res) =>{
    try{
        const {id_ws} = req.params;
        const genders_ws = await prisma.genders_ws.findUnique({
            where: {id_ws: parseInt(id_ws)}
        });
        if(genders_ws){
            res.status(200).json(genders_ws);
        }else {
            res.status(404).json({msg: "Error al obtener gender"});
        }
    } catch (error){
        res.status(500).json({msg: "Error en el servidor"});
    }
};

export const createGender_ws = async (req, res) => {
    try{
        const {name_ws} = req.body;
        const genders_ws = await prisma.genders_ws.create({
            data: {name_ws},
        });

        if(genders_ws){
            res.status(200).json({msg: "Gender regitrado correctamente", gender: genders_ws})
        } else {
            res.status(404).json({msg: "Error al registrar gender"})
        }
    } catch (error){
        console.error(error);
        res.status(500).json({msg: "Error en el servidor"})
    }
};

export const updateGenderId_ws = async (req, res) => {
    try{
        const id_ws = parseInt(req.params.id_ws);
        const {name_ws} = req.body;
        let updateData = {name_ws};
        const genders_ws = await prisma.genders_ws.update({
          where: { id_ws:id_ws}, 
          data: updateData,
        });

        if(genders_ws){
            res.status(200).json({msg: "Gender actualizado correctamente", gender: genders_ws})
        }else{
            res.status(404).json({msg: "Error al actulizar gender"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    } 
};

export const deleteGenderId_ws = async (req, res) =>{
    try{
        const {id_ws} = req.params;
        await prisma.genders_ws.delete({
            where: { id_ws: parseInt(id_ws) },
        });

        res.status(200).json({msg: "Gender eliminado correctamente"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
      }
 };


