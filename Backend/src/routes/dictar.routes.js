import { Router } from "express";
import {
  getAllDictados,
  getDictadosPorProfesor,
  createNewDictado,
  updateExistingDictado,
  deleteExistingDictado,
  obtenerDictadosPorRegion
} from "../controllers/dictar.controller.js";

const router = Router();

// Rutas para los endpoints del controller de dictados
router.get("/dictados", getAllDictados);
router.get("/dictados/profesor/:cod_profesor", getDictadosPorProfesor);
router.post("/dictados", createNewDictado);
router.put("/dictados", updateExistingDictado);
router.delete("/dictados", deleteExistingDictado);
router.get("/dictados/reg/:region", obtenerDictadosPorRegion);

export default router;
