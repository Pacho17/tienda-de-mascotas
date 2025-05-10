import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategorie_ws = async(req, res)=>{
    try{
        const categories_ws = await prisma.categories_ws.findMany();
        if(categories_ws) {
            res.status(200).json(categories_ws)
        } else {
            res.status(400).json({msg: "Error al obtener categories"});
        }
    }catch (error){
        console.error(error);
        res.status(500).json({msg: "Error en el servidor"})
    }
};

export const getCategorieId_ws = async (req, res) =>{
    try{
        const {id_ws} = req.params;
        const categories_ws = await prisma.categories_ws.findUnique({
            where: {id_ws: parseInt(id_ws)}
        });
        if(categories_ws){
            res.status(200).json(genders_ws);
        }else {
            res.status(404).json({msg: "Error al obtener categorie"});
        }
    } catch (error){
        res.status(500).json({msg: "Error en el servidor"});
    }
};

export const createCategorie_ws = async (req, res) => {
    try{
        const {name_ws} = req.body;
        const categories_ws = await prisma.categories_ws.create({
            data: {name_ws},
        });

        if(categories_ws){
            res.status(200).json({msg: "Categorie regitrado correctamente", categorie: categories_ws})
        } else {
            res.status(404).json({msg: "Error al registrar categorie"})
        }
    } catch (error){
        console.error(error);
        res.status(500).json({msg: "Error en el servidor"})
    }
};

export const updateCategorieId_ws = async (req, res) => {
    try{
        const id_ws = parseInt(req.params.id_ws);
        const {name_ws} = req.body;
        let updateData = {name_ws};
        const categories_ws = await prisma.categories_ws.update({
          where: { id_ws:id_ws}, 
          data: updateData,
        });

        if(categories_ws){
            res.status(200).json({msg: "Categorie actualizado correctamente", categorie: categories_ws})
        }else{
            res.status(404).json({msg: "Error al actulizar categorie"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    } 
};

export const deleteCategorieId_ws = async (req, res) =>{
    try{
        const {id_ws} = req.params;
        await prisma.categories_ws.delete({
            where: { id_ws: parseInt(id_ws) },
        });

        res.status(200).json({msg: "Categorie eliminado correctamente"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
      }
 };


