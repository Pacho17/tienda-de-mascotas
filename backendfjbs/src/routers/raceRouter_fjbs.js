import { Router } from "express";
import { validarToken_ws } from "../controllers/autenticacionController_ws.js";
import { createRace_ws, deleteRaceId_ws, getRace_ws, getRaceId_ws, updateRaceId_ws } from "../controllers/raceController_ws.js";


const router_ws = Router();

router_ws.get("/races_ws",validarToken_ws,getRace_ws);
router_ws.get("/races_ws/:id_ws",validarToken_ws, getRaceId_ws);
router_ws.post("/races_ws", validarToken_ws,createRace_ws);
router_ws.put("/races_ws",validarToken_ws,updateRaceId_ws);
router_ws.delete("/races_ws",validarToken_ws,deleteRaceId_ws);


export default router_ws;