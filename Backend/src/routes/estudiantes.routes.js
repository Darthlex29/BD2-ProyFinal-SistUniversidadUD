import { Router } from "express";
import {
  obtenerEstudiantes,
  obtenerEstudiantePorDoc,
  crearEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
  obtenerEstudiantesConGrupos,
  obtenerEstudiantesConPregrado
} from "../controllers/estudiante.controller.js";

const router = Router();

// Rutas para los endpoints del controller de estudiantes
router.get("/estudiantes", obtenerEstudiantes);
router.get("/estudiantes/id/:numero_documento", obtenerEstudiantePorDoc);
router.post("/estudiantes", crearEstudiante);
router.put("/estudiantes/id/:numero_documento", actualizarEstudiante);
router.delete("/estudiantes/id/:numero_documento", eliminarEstudiante);
router.get("/estudiantes/grupos", obtenerEstudiantesConGrupos);
router.get("/estudiantes/pregrado", obtenerEstudiantesConPregrado);

export default router;
