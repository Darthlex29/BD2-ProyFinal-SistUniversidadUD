import {
    getEstudiantes,
    getEstudianteByDoc,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante,
    getEstudiantesConGrupos,
    getEstudiantesConPregrado
  } from "../repositories/estudiantes.dao.js";
import { getGruposConEstudiantes } from "../repositories/grupo.dao.js";
  
  // Obtener todos los estudiantes
  export const obtenerEstudiantes = async (req, res) => {
    try {
      const estudiantes = await getEstudiantes();
      res.json(estudiantes);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los estudiantes" });
    }
  };
  
  // Obtener un estudiante por número de documento
  export const obtenerEstudiantePorDoc = async (req, res) => {
    const { numero_documento } = req.params;
    try {
      const estudiante = await getEstudianteByDoc(numero_documento);
      if (!estudiante) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
      }
      res.json(estudiante);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el estudiante" });
    }
  };
  
  // Crear un nuevo estudiante
  export const crearEstudiante = async (req, res) => {
    const { numero_documento, nombre, apellido, correo, telefono, cod_pregrado, sede } = req.body;
    try {
      const nuevoEstudiante = await createEstudiante(numero_documento, nombre, apellido, correo, telefono, cod_pregrado, sede);
      res.status(201).json(nuevoEstudiante);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el estudiante" });
    }
  };
  
  // Actualizar un estudiante
  export const actualizarEstudiante = async (req, res) => {
    const { numero_documento } = req.params;
    const { nombre, apellido, correo, telefono, cod_pregrado, sede } = req.body;
    try {
      const estudianteActualizado = await updateEstudiante(numero_documento, nombre, apellido, correo, telefono, cod_pregrado, sede);
      if (!estudianteActualizado) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
      }
      res.json(estudianteActualizado);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el estudiante" });
    }
  };
  
  // Eliminar un estudiante
  export const eliminarEstudiante = async (req, res) => {
    const { numero_documento } = req.params;
    try {
      const estudianteEliminado = await deleteEstudiante(numero_documento);
      if (!estudianteEliminado) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
      }
      res.json({ message: "Estudiante eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el estudiante" });
    }
  };
  
  // Obtener estudiantes con sus grupos
  export const obtenerEstudiantesConGrupos = async (req, res) => {
    try {
      const estudiantesConGrupos = await getEstudiantesConGrupos();
      res.json(estudiantesConGrupos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener estudiantes con sus grupos" });
    }
  };
  
  // Obtener grupos con la cantidad de estudiantes inscritos
  export const obtenerGruposConEstudiantes = async (req, res) => {
    try {
      const gruposConEstudiantes = await getGruposConEstudiantes();
      res.json(gruposConEstudiantes);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los grupos con estudiantes" });
    }
  };
  
  // Obtener estudiantes con su pregrado
  export const obtenerEstudiantesConPregrado = async (req, res) => {
    try {
      const estudiantesConPregrado = await getEstudiantesConPregrado();
      res.json(estudiantesConPregrado);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los estudiantes con su pregrado" });
    }
  };
  