import { Router } from "express";
import {
  obtenerGrupos,
  obtenerGrupoPorId,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo,
  obtenerGruposConEstudiantes,
  obtenerOfertaAcademicaPorSede
} from "../controllers/grupo.controller.js";

const router = Router();

// Rutas para los endpoints del controller de grupos
router.get("/grupos", obtenerGrupos);
router.get("/grupos/:cod_grupo", obtenerGrupoPorId);
router.post("/grupos", crearGrupo);
router.put("/grupos/:cod_grupo", actualizarGrupo);
router.delete("/grupos/:cod_grupo", eliminarGrupo);
router.get("/grupos/estudiantes", obtenerGruposConEstudiantes);
router.get("/oferta-academica/:sede", obtenerOfertaAcademicaPorSede);

export default router;
