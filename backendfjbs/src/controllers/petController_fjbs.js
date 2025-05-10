import { PrismaClient } from "@prisma/client";
import multer from 'multer';

 const prisma = new PrismaClient();

 const storage= multer.diskStorage({
    destination:function(req,img,cb){
        cb(null,"public/img");
    },
    filename: function(req,img,cb){
        cb(null,img.originalname);
    }
 });

 const upload= multer({storage:storage});
 export const CargarImg=upload.single('photo_ws')


 export const getPet_ws = async (req, res)=>{
    try{
        const pets_ws = await prisma.pets_ws.findMany({
            include: {
                race_ws: true,
                category_ws: true,
                gender_ws: true,
                user_ws: true,
            }
        });
        if(pets_ws){
            res.status(200).json(pets_ws);
        }else{
            res.status(404).json({msg:"Error al obtener las mascotas"});
        }
    }catch (error){
        console.error(error);
        res.status(500).json({msg: "Error en el servidor"})
    }
 };

 export const getPetId_ws = async (req, res)=>{
    try{
        const {id_ws} = req.params;
        const pets_ws = await prisma.pets_ws.findUnique({
            where: {id_ws: parseInt(id_ws)},
            include: {
                race_ws: true,
                category_ws: true,
                gender_ws: true,
                user_ws: true,
            }
        });
        
        if(pets_ws){
            res.status(200).json(pets_ws);
        }else {
            res.status(404).json({msg: "Error al obtener mascota"});
        }
    } catch (error){
        res.status(500).json({msg: "Error en el servidor"});
    }
 };

 export const createPet_ws = async (req, res) => {
    try {
      const {name_ws,  raceId_ws, estado_ws, categoryId_ws, genderId_ws, userId_ws } = req.body;
  
      if (!req.file) {
        return res.status(400).json({ msg: "Imagen obligatoria" });
      }
      
      const name = String(name_ws);
      const raceId = Number(raceId_ws);
      const categoryId = Number(categoryId_ws);
      const genderId = Number(genderId_ws);
      const userId = Number(userId_ws);
  
      if ([name, raceId, categoryId, genderId, userId].some(isNaN)) {
        return res.status(400).json({ msg: "IDs inválidos" });
      }
  
      const photo_ws = req.file.filename;
  
      const pet = await prisma.pets_ws.create({
        data: {
          name_ws: name,
          raceId_ws: raceId,
          estado_ws,
          categoryId_ws: categoryId,
          genderId_ws: genderId,
          userId_ws: userId,
          photo_ws
        },
      });
  
      res.status(200).json({ msg: "Pet registrado correctamente", pet });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  };

 export const updatePetId_ws = async (req, res)=>{
    try{
        const id_ws = parseInt(req.params.id_ws);
        const {name_ws, raceId_ws, estado_ws, categoryId_ws, genderId_ws, userId_ws} = req.body;
        let updateData = {name_ws, raceId_ws, estado_ws, categoryId_ws, genderId_ws, userId_ws };
        if (req.file) {
            updateData.photo_ws = req.file.filename;
          }        
        const pets_ws = await prisma.pets_ws.update({
          where: { id_ws:id_ws }, 
          data: updateData,
        });

        if(pets_ws){
            res.status(200).json({msg: "Pet actualizado correctamente", pet: pets_ws})
        }else{
            res.status(404).json({msg: "Error al actulizar pet"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    } 
 }

 export const deletePetId_ws = async (req, res) =>{
    try{
        const {id_ws} = req.params;
        await prisma.pets_ws.delete({
            where: { id_ws: parseInt(id_ws) },
        });

        res.status(200).json({msg: "Pet eliminado correctamente"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
      }
 };

 