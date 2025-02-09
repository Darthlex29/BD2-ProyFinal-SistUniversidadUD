import { createAsignatura, deleteAsignatura, getAsignaturaById, getAsignaturas, getAsignaturasConProfesores, updateAsignatura } from "../repositories/asignatura.dao.js";

// Obtener todas las asignaturas
export const obtenerAsignaturas = async (req, res) => {
    try {
      const asignaturas = await getAsignaturas();
      res.json(asignaturas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las asignaturas" });
    }
  };
  
  // Obtener una asignatura por código
  export const obtenerAsignaturaPorId = async (req, res) => {
    const { cod_asignatura } = req.params;
    try {
      const asignatura = await getAsignaturaById(cod_asignatura);
      if (!asignatura) {
        return res.status(404).json({ error: "Asignatura no encontrada" });
      }
      res.json(asignatura);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la asignatura" });
    }
  };
  
  // Crear una nueva asignatura
  export const crearAsignatura = async (req, res) => {
    const { cod_asignatura, nombre_asignatura, cod_pregrado, cod_curso, horas_semanales, sede } = req.body;
    try {
      const nuevaAsignatura = await createAsignatura(cod_asignatura, nombre_asignatura, cod_pregrado, cod_curso, horas_semanales, sede);
      res.status(201).json(nuevaAsignatura);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la asignatura" });
    }
  };
  
  // Actualizar una asignatura
  export const actualizarAsignatura = async (req, res) => {
    const { cod_asignatura } = req.params;
    const { nombre_asignatura, cod_pregrado, cod_curso, horas_semanales, sede } = req.body;
    try {
      const asignaturaActualizada = await updateAsignatura(cod_asignatura, nombre_asignatura, cod_pregrado, cod_curso, horas_semanales, sede);
      if (!asignaturaActualizada) {
        return res.status(404).json({ error: "Asignatura no encontrada" });
      }
      res.json(asignaturaActualizada);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la asignatura" });
    }
  };
  
  // Eliminar una asignatura
  export const eliminarAsignatura = async (req, res) => {
    const { cod_asignatura } = req.params;
    try {
      const asignaturaEliminada = await deleteAsignatura(cod_asignatura);
      if (!asignaturaEliminada) {
        return res.status(404).json({ error: "Asignatura no encontrada" });
      }
      res.json({ message: "Asignatura eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la asignatura" });
    }
  };
  
  // Obtener asignaturas con profesores
  export const obtenerAsignaturasConProfesores = async (req, res) => {
    try {
      const asignaturasConProfesores = await getAsignaturasConProfesores();
      res.json(asignaturasConProfesores);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las asignaturas con profesores" });
    }
  };