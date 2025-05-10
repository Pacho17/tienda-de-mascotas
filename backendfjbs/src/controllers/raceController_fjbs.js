import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRace_ws = async(req, res)=>{
    try{
        const races_ws = await prisma.races_ws.findMany();
        if(races_ws) {
            res.status(200).json(races_ws)
        } else {
            res.status(400).json({msg: "Error al obtener races"});
        }
    }catch (error){
        console.error(error);
        res.status(500).json({msg: "Error en el servidor"})
    }
};

export const getRaceId_ws = async (req, res) =>{
    try{
        const {id_ws} = req.params;
        const races_ws = await prisma.races_ws.findUnique({
            where: {id_ws: parseInt(id_ws)}
        });
        if(races_ws){
            res.status(200).json(races_ws);
        }else {
            res.status(404).json({msg: "Error al obtener race"});
        }
    } catch (error){
        res.status(500).json({msg: "Error en el servidor"});
    }
};

export const createRace_ws = async (req, res) => {
    try{
        const {name_ws} = req.body;
        const races_ws = await prisma.races_ws.create({
            data: {name_ws},
        });

        if(races_ws){
            res.status(200).json({msg: "Race regitrado correctamente", race: races_ws})
        } else {
            res.status(404).json({msg: "Error al registrar race"})
        }
    } catch (error){
        console.error(error);
        res.status(500).json({msg: "Error en el servidor"})
    }
};

export const updateRaceId_ws = async (req, res) => {
    try{
        const id_ws = parseInt(req.params.id_ws);
        const {name_ws} = req.body;
        let updateData = {name_ws};
        const races_ws = await prisma.races_ws.update({
          where: { id_ws:id_ws}, 
          data: updateData,
        });

        if(races_ws){
            res.status(200).json({msg: "Race actualizado correctamente", race: races_ws})
        }else{
            res.status(404).json({msg: "Error al actulizar race"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    } 
};

export const deleteRaceId_ws = async (req, res) =>{
    try{
        const {id_ws} = req.params;
        await prisma.races_ws.delete({
            where: { id_ws: parseInt(id_ws) },
        });

        res.status(200).json({msg: "Race eliminado correctamente"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
      }
 };


