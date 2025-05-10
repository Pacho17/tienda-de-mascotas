import { Router } from "express";
import { listarMascotasfjbs, buscarMascotasfjbs, registrarMascotasfjbs, actualizarMascotasfjbs, eliminarMascotasfjbs } from "../controllers/mascotasController_fjbs.js";   
import { cargarImagen } from '../controllers/mascotasController_fjbs.js';

const ruta =Router()

ruta.get("/mascotasfjbs", listarMascotasfjbs)
ruta.get("/mascotasfjbs/:id_mascota", buscarMascotasfjbs)
ruta.post("/mascotasfjbs",cargarImagen, registrarMascotasfjbs)
ruta.put("/mascotasfjbs/:id_mascotas", actualizarMascotasfjbs)
ruta.delete("/mascotasfjbs/:id_mascotas", eliminarMascotasfjbs)

export default ruta