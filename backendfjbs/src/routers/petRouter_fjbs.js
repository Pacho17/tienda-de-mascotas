import { Router } from "express";
import { validarToken_ws } from "../controllers/autenticacionController_ws.js";
import { CargarImg, createPet_ws, deletePetId_ws, getPet_ws, getPetId_ws, updatePetId_ws } from "../controllers/petController_ws.js";


const router_ws = Router();

router_ws.post("/pets_ws",validarToken_ws,CargarImg,createPet_ws);
router_ws.get("/pets_ws",validarToken_ws,getPet_ws);
router_ws.get("/pets_ws/:id_ws",validarToken_ws, getPetId_ws);
router_ws.put("/pets_Ws/:id_ws",validarToken_ws,CargarImg,updatePetId_ws);
router_ws.delete("/pets_ws/:id_ws",validarToken_ws, deletePetId_ws);

export default router_ws;