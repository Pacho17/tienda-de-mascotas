import { Router } from "express";
import { loginUser_ws } from "../controllers/autenticacionController_ws.js";

const router_ws = Router();

router_ws.post("/login_ws", loginUser_ws);

export default router_ws;