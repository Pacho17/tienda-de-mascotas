import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import dotenv from 'dotenv';
import cors from 'cors';

import { UserRouterfjbs } from './src/routers/userRouter_fjbs.js';
import { LoginRouterfjbs } from './src/routers/authRouter_fjbs.js';
import { genderRouterfjbs } from './src/routers/gendersRouter_fjbs.js';
import { categoryRouterfjbs } from './src/routers/categoryRouter_fjbs.js';
import { petRouterfjbs } from './src/routers/petsRouter_fjbs.js';
import { raceRouterfjbs } from './src/routers/raceRouter_fjbs.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta de imágenes
app.use('/images', express.static('images'));  

// Cargar la documentación Swagger
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');
app.use('/document', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routers
app.use(UserRouterfjbs);
app.use(LoginRouterfjbs);
app.use(genderRouterfjbs);
app.use(categoryRouterfjbs);
app.use(petRouterfjbs);
app.use(raceRouterfjbs);

// Iniciar servidor
app.listen(3000, '0.0.0.0', () => {
    console.log(`Servidor de PACHO iniciado en http://192.168.18.165:3000`);

});
