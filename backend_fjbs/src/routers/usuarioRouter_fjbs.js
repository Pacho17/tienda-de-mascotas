import { Router } from "express";
import {listarUsuariofjbs, buscarUsuariofjbs, registrarUsuariofjbs, actualizarUsuariofjbs, eliminarUsuariofjbs} from "../controllers/usuarioController_fjbs.js"


const ruta = Router();

ruta.get("/usuariofjbs",listarUsuariofjbs)
ruta.get("/usuariofjbs/:id_usuario",buscarUsuariofjbs)
ruta.post("/usuariofjbs",registrarUsuariofjbs)
ruta.put("/usuariofjbs/:id_usuario",actualizarUsuariofjbs)
ruta.delete("/usuariofjbs/:id_usuario",eliminarUsuariofjbs)

export default ruta