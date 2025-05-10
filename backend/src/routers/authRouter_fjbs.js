import { Router } from "express";
import { loginUserfjbs } from "../controllers/authController_fjbs.js";


export const LoginRouterfjbs = Router()
LoginRouterfjbs.post('/loginfjbs',loginUserfjbs)