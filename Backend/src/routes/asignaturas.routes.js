import { Router } from "express";
import {
  obtenerAsignaturas,
  obtenerAsignaturaPorId,
  crearAsignatura,
  actualizarAsignatura,
  eliminarAsignatura,
  obtenerAsignaturasConProfesores
} from "../controllers/asignatura.controller.js";

const router = Router();

// Rutas para los endpoints del controller de asignaturas
router.get("/asignaturas", obtenerAsignaturas);
router.get("/asignaturas/cod/:cod_asignatura", obtenerAsignaturaPorId);
router.post("/asignaturas", crearAsignatura);
router.put("/asignaturas/cod/:cod_asignatura", actualizarAsignatura);
router.delete("/asignaturas/cod/:cod_asignatura", eliminarAsignatura);
router.get("/asignaturas/profesores", obtenerAsignaturasConProfesores);

export default router;
