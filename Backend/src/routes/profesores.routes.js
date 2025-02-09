import { Router } from "express";
import {
  obtenerProfesores,
  obtenerProfesorPorDoc,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor,
  obtenerHorasProfesores,
  obtenerCargaAcademicaProfesores,
  obtenerProfesoresCompleto,
  obtenerProfesoresPorRegion
} from "../controllers/profesores.controller.js";

const router = Router();

// Rutas para los endpoints del controller de profesores
router.get("/profesores", obtenerProfesores);
router.get("/profesores/doc/:numero_documento", obtenerProfesorPorDoc);
router.post("/profesores", crearProfesor);
router.put("/profesores/doc/:numero_documento", actualizarProfesor);
router.delete("/profesores/doc/:numero_documento", eliminarProfesor);
router.get("/profesores/horas", obtenerHorasProfesores);
router.get("/profesores/carga-academica", obtenerCargaAcademicaProfesores);
router.get("/profesores/completo", obtenerProfesoresCompleto);
router.get("/profesores/reg/:region", obtenerProfesoresPorRegion);

export default router;
