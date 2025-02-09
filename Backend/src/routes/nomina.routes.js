import { Router } from "express";
import {
  obtenerNominas,
  obtenerNominaPorDoc,
  crearNomina,
  eliminarNomina,
  actualizarNomina
} from "../controllers/nomina.controller.js";

const router = Router();

// Rutas para los endpoints del controller de nóminas
router.get("/nominas", obtenerNominas);
router.get("/nominas/doc/:numero_documento", obtenerNominaPorDoc);
router.post("/nominas", crearNomina);
router.put("/nominas/doc/:numero_documento", actualizarNomina);
router.delete("/nominas/doc/:numero_documento", eliminarNomina);

export default router;
