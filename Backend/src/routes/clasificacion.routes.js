import { Router } from "express";
import {
  getClasificaciones,
  getClasificacionByCat,
  createClasificacion,
  updateClasificacion,
  deleteClasificacion
} from "../controllers/clasificacion.controller.js";

const router = Router();

// Rutas para los endpoints del controller de clasificaciones
router.get("/clasificaciones", getClasificaciones);
router.get("/clasificaciones/cat/:categoria", getClasificacionByCat);
router.post("/clasificaciones", createClasificacion);
router.put("/clasificaciones/cat/:categoria", updateClasificacion);
router.delete("/clasificaciones/cat/:categoria", deleteClasificacion);

export default router;
