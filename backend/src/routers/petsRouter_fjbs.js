import { Router } from "express";
import { verifyTokenfjbs } from "../controllers/authController_fjbs.js";
import { createPetfjbs, deletePetfjbs, getPetByIdfjbs, getPetsfjbs, updatePetfjbs } from "../controllers/petsController_fjbs.js";
import { upload } from "../config/multer.js";


export const petRouterfjbs = Router()
petRouterfjbs.post('/petsfjbs',upload.single("photo"),verifyTokenfjbs,createPetfjbs )
petRouterfjbs.get('/petsfjbs',verifyTokenfjbs, getPetsfjbs )
petRouterfjbs.get('/petsfjbs/:id',verifyTokenfjbs, getPetByIdfjbs )
petRouterfjbs.put('/petsfjbs/:id',verifyTokenfjbs, updatePetfjbs )
petRouterfjbs.delete('/petsfjbs/:id',verifyTokenfjbs, deletePetfjbs )

