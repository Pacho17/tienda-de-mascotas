import { Router } from "express";
import { validarToken_ws } from "../controllers/autenticacionController_ws.js";
import { createUser_ws, deleteUserId_ws, getUser_ws, getUserId_ws, updateUserId_ws } from "../controllers/userController_ws.js";

const router_ws = Router();

router_ws.get("/users_ws", validarToken_ws, getUser_ws);
router_ws.get("/users_ws/:id_ws", validarToken_ws, getUserId_ws);
router_ws.post("/users_ws", validarToken_ws,createUser_ws);
router_ws.put("/users_ws/:id_ws",validarToken_ws, updateUserId_ws);
router_ws.delete("/users_ws/:id_ws", validarToken_ws, deleteUserId_ws);

export default router_ws;