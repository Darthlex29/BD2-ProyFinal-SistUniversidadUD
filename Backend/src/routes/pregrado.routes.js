import express from "express";
import {
  obtenerPregrados,
  obtenerPregradoPorId,
  crearPregradoController,
  actualizarPregradoController,
  eliminarPregradoController,
  obtenerPregradosPorRegionController
} from "../controllers/pregrado.controller.js";

const router = express.Router();

// Definir las rutas del CRUD de pregrado
router.get("/pregrado", obtenerPregrados);
router.get("/pregrado/id/:id", obtenerPregradoPorId);
router.post("/pregrado", crearPregradoController);
router.put("/pregrado/id/:id", actualizarPregradoController);
router.delete("/pregrado/id/:id", eliminarPregradoController);
router.get("/pregrados/reg/:region", obtenerPregradosPorRegionController);

export default router;
