import { Router } from 'express';
import { createGender_ws, deleteGenderId_ws, getGender_ws, getGenderId_ws, updateGenderId_ws } from '../controllers/genderController_ws.js';
import { validarToken_ws } from '../controllers/autenticacionController_ws.js';


const router_ws = Router();

router_ws.get("/genders_ws",validarToken_ws,getGender_ws);
router_ws.get("/genders_ws/:id_ws",validarToken_ws,getGenderId_ws);
router_ws.post("/genders_ws",validarToken_ws,createGender_ws);
router_ws.put("/genders_ws/:id_ws",validarToken_ws,updateGenderId_ws);
router_ws.delete("/genders_ws/:id_ws",validarToken_ws,deleteGenderId_ws);

export default router_ws;