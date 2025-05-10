import {Router} from "express";
import {listarCategoriafjbs,buscarCategoriafjbs,registrarCategoriafjbs, eliminarCategoriafjbs, actualizarCategoriafjbs } from '../controllers/categoriaController_fjbs.js';

const ruta =Router();

ruta.get("/categoriafjbs", listarCategoriafjbs);
ruta.get("/categoriafjbs", buscarCategoriafjbs)
ruta.post("/categoriafjbs",registrarCategoriafjbs);
ruta.put("/categoriafjbs/:id_categoria",actualizarCategoriafjbs);
ruta.delete("/categoriafjbs/:id_categoria",eliminarCategoriafjbs);

export default ruta;