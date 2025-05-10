import { Router } from "express";
import { loginUserfjbs } from "../controllers/authController_fjbs.js";

export const LoginRouter = Router()
LoginRouter.post('/loginfjbs',loginUserfjbs)

export default LoginRouter