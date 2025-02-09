import { Router } from "express";
import {
  getCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
  verificarDisponibilidadCurso,
  getCursosDetallados,
  obtenerCursosPorRegion
} from "../controllers/curso.controller.js";

const router = Router();

// Rutas para los endpoints del controller de cursos
router.get("/cursos", getCursos);
router.get("/cursos/:cod_curso", getCursoById);
router.post("/cursos", createCurso);
router.put("/cursos/:cod_curso", updateCurso);
router.delete("/cursos/:cod_curso", deleteCurso);
router.get("/cursos/disponibilidad/:cod_curso", verificarDisponibilidadCurso);
router.get("/cursos/detallados", getCursosDetallados);
router.get("/cursos/reg/:region", obtenerCursosPorRegion);

export default router;
