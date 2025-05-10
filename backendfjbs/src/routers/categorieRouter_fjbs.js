import { Router } from "express";
import { validarToken_ws } from "../controllers/autenticacionController_ws.js";
import { createCategorie_ws, deleteCategorieId_ws, getCategorie_ws, getCategorieId_ws, updateCategorieId_ws } from "../controllers/categorieController_ws.js";

const router_ws = Router();

router_ws.get("/categories_ws",validarToken_ws,getCategorie_ws);
router_ws.get("/categories_ws/:id_ws",validarToken_ws,getCategorieId_ws);
router_ws.post("/categories_ws",validarToken_ws,createCategorie_ws);
router_ws.put("/categories_ws/:id_ws",validarToken_ws,updateCategorieId_ws);
router_ws.delete("/categories_ws/:id_ws",validarToken_ws,deleteCategorieId_ws);

export default router_ws;