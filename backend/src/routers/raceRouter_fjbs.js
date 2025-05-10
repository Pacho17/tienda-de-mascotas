import { Router } from "express";
import { verifyTokenfjbs } from "../controllers/authController_fjbs.js";
import { createRacefjbs, deleteRacefjbs, getRaceByIdfjbs, getRacesfjbs, updateRacefjbs } from "../controllers/racesController_fjbs.js";

export const raceRouterfjbs = Router()
raceRouterfjbs.post('/racefjbs',verifyTokenfjbs, createRacefjbs )
raceRouterfjbs.get('/racefjbs',verifyTokenfjbs, getRacesfjbs )
raceRouterfjbs.get('/racefjbs/:id',verifyTokenfjbs, getRaceByIdfjbs )
raceRouterfjbs.put('/racefjbs/:id',verifyTokenfjbs, updateRacefjbs)
raceRouterfjbs.delete('/racefjbs/:id',verifyTokenfjbs, deleteRacefjbs )

