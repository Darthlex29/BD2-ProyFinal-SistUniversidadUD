import express from "express";
import {
  obtenerPregrados,
  obtenerPregradoPorId,
  crearPregrado,
  actualizarPregrado,
  eliminarPregrado,
  obtenerPregradosPorRegion
} from "../controllers/pregrado.controller.js";

const router = express.Router();

// Definir las rutas del CRUD de pregrado
router.get("/pregrado", obtenerPregrados);
router.get("/pregrado:id", obtenerPregradoPorId);
router.post("/pregrado", crearPregrado);
router.put("/pregrado:id", actualizarPregrado);
router.delete("/pregrado:id", eliminarPregrado);
router.get("/pregrados/reg/:region", obtenerPregradosPorRegion);

export default router;
