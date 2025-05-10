import { Router } from "express";
import { verifyTokenfjbs } from "../controllers/authController_fjbs.js";
import { createUserfjbs, deleteUserfjbs, getUserByIdfjbs, getUserfjbs, updateUserfjbs } from "../controllers/userController_fjbs.js";


export const UserRouterfjbs = Router()
UserRouterfjbs.post('/usersfjbs',createUserfjbs )
UserRouterfjbs.get('/usersfjbs', getUserfjbs )
UserRouterfjbs.get('/usersfjbs/:id',verifyTokenfjbs, getUserByIdfjbs )
UserRouterfjbs.put('/usersfjbs/:id',verifyTokenfjbs, updateUserfjbs )
UserRouterfjbs.delete('/usersfjbs/:id',verifyTokenfjbs, deleteUserfjbs )

