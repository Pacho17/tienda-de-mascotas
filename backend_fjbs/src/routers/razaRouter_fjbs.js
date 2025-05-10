import { Router } from "express";
import { listarRazafjbs, buscarRazafjbs, registrarRazafjbs, actualizarRazafjbs, eliminarRazafjbs } from "../controllers/razaController_fjbs.js";   


const ruta =Router()

ruta.get("/razafjbs", listarRazafjbs)
ruta.get("/razafjbs/:id_raza", buscarRazafjbs)
ruta.post("/razafjbs", registrarRazafjbs)
ruta.put("/razafjbs/:id_raza", actualizarRazafjbs)
ruta.delete("/razafjbs/:id_raza", eliminarRazafjbs)

export default ruta