import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

import usuario from './src/routers/usuarioRouter_fjbs.js';
import mascotas from './src/routers/mascotasRouter_fjbs.js';
import categoria from './src/routers/categoriaRouter_fjbs.js';
import raza from './src/routers/razaRouter_fjbs.js';
import auth from './src/routers/authRouter_fjbs.js';

const app = express();

app.use(express.static('./public'));


app.use(cors({
    origin: 'http://localhost:3000/loginfjbs', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(usuario);
app.use(mascotas);
app.use(categoria);
app.use(raza);
app.use(auth);

app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});