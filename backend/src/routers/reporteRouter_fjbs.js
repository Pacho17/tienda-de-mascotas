import express from 'express';
import { verifyTokenfjbs } from "../controllers/authController_fjbs.js";
import { getReports, downloadReport } from '../controllers/reporteController_fjbs.js';

const router = express.Router();

router.get('/reportes',verifyTokenfjbs, getReports);
router.get('/descargar-reporte', downloadReport);

export { router as reporteRouterfjbs };