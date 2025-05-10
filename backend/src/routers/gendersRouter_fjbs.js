import { Router } from "express";
import { verifyTokenfjbs } from "../controllers/authController_fjbs.js";
import { createGenderfjbs, deleteGenderfjbs, getGenderByIdfjbs, getGendersfjbs, updateGenderfjbs } from "../controllers/gendersController_fjbs.js";


export const genderRouterfjbs = Router()
genderRouterfjbs.post('/genderfjbs',verifyTokenfjbs, createGenderfjbs )
genderRouterfjbs.get('/genderfjbs',verifyTokenfjbs, getGendersfjbs )
genderRouterfjbs.get('/genderfjbs/:id',verifyTokenfjbs, getGenderByIdfjbs )
genderRouterfjbs.put('/genderfjbs/:id',verifyTokenfjbs, updateGenderfjbs)
genderRouterfjbs.delete('/genderfjbs/:id',verifyTokenfjbs, deleteGenderfjbs )

