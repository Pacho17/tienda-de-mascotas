import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import autenticacionRouter_fjbs from "./src/routers/autenticacionRouter_fjbs.js";
import userRouter_fjbs from "./src/routers/userRouter_fjbs.js";
import petRouter_fjbs from "./src/routers/petRouter_fjbs.js";
import raceRouter_fjbs from "./src/routers/raceRouter_fjbs.js";
import genderRouter_fjbs from "./src/routers/genderRouter_fjbs.js";
import categorieRouter_fjbs from "./src/routers/categorieRouter_fjbs.js";

const app = express(); 
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(autenticacionRouter_fjbs);
app.use(userRouter_fjbs);
app.use(petRouter_fjbs);
app.use(raceRouter_fjbs);
app.use(genderRouter_fjbs);
app.use(categorieRouter_fjbs);

app.listen(3000, '0.0.0.0',()=>{
    console.log("Servidor corriendo en el puerto 3000 url http://10.4.20.224:3000");

    console.log(
        `Version 1 de documentacion nativa dsiponible en url http://localhost:3000/api-docs`
    )
});