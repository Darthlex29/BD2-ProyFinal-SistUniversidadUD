import express from "express";
import { getRegion, updateRegion } from "../controllers/region.controller.js";

const router = express.Router();

// Ruta para obtener la región actual
router.get("/region", getRegion);

// Ruta para actualizar la región (se espera un JSON con { "region": "valor" })
router.put("/region", updateRegion);

export default router;