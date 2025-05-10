import { Router } from "express";
import { verifyTokenfjbs } from "../controllers/authController_fjbs.js";
import { createCategoryfjbs, deleteCategoryfjbs, getCategoriesfjbs, getCategoryByIdfjbs, updateCategoryfjbs } from "../controllers/categoryController_fjbs.js";

export const categoryRouterfjbs = Router()
categoryRouterfjbs.post('/categoryfjbs',verifyTokenfjbs,createCategoryfjbs )
categoryRouterfjbs.get('/categoryfjbs',verifyTokenfjbs, getCategoriesfjbs )
categoryRouterfjbs.get('/categoryfjbs/:id',verifyTokenfjbs, getCategoryByIdfjbs )
categoryRouterfjbs.put('/categoryfjbs/:id',verifyTokenfjbs, updateCategoryfjbs )
categoryRouterfjbs.delete('/categoryfjbs/:id',verifyTokenfjbs, deleteCategoryfjbs )

