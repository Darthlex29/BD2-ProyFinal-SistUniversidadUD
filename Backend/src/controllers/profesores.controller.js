import { createProfesor, deleteProfesor, getCargaAcademicaProfesores, getHorasProfesores, getProfesorByDoc, getProfesores, getProfesoresByRegion, getProfesoresCompleto, updateProfesor } from "../repositories/profesor.dao.js";

// Obtener todos los profesores
export const obtenerProfesores = async (req, res) => {
    try {
      const profesores = await getProfesores();
      res.json(profesores);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los profesores" });
    }
  };
  
  // Obtener un profesor por número de documento
  export const obtenerProfesorPorDoc = async (req, res) => {
    const { numero_documento } = req.params;
    try {
      const profesor = await getProfesorByDoc(numero_documento);
      if (!profesor) {
        return res.status(404).json({ error: "Profesor no encontrado" });
      }
      res.json(profesor);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el profesor" });
    }
  };
  
  // Crear un nuevo profesor
  export const crearProfesor = async (req, res) => {
    const { numero_documento, nombre, direccion, categoria, telefono, email, sede } = req.body;
    try {
      const nuevoProfesor = await createProfesor(numero_documento, nombre, direccion, categoria, telefono, email, sede);
      res.status(201).json(nuevoProfesor);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el profesor" });
    }
  };
  
  // Actualizar un profesor
  export const actualizarProfesor = async (req, res) => {
    const { numero_documento } = req.params;
    const { nombre, direccion, categoria, telefono, email, sede } = req.body;
    try {
      const profesorActualizado = await updateProfesor(numero_documento, nombre, direccion, categoria, telefono, email, sede);
      if (!profesorActualizado) {
        return res.status(404).json({ error: "Profesor no encontrado" });
      }
      res.json(profesorActualizado);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el profesor" });
    }
  };
  
  // Eliminar un profesor
  export const eliminarProfesor = async (req, res) => {
    const { numero_documento } = req.params;
    try {
      const profesorEliminado = await deleteProfesor(numero_documento);
      if (!profesorEliminado) {
        return res.status(404).json({ error: "Profesor no encontrado" });
      }
      res.json({ message: "Profesor eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el profesor" });
    }
  };
  
  // Obtener horas asignadas a cada profesor
  export const obtenerHorasProfesores = async (req, res) => {
    try {
      const horasProfesores = await getHorasProfesores();
      res.json(horasProfesores);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la relación de horas de los profesores" });
    }
  };
  
  // Obtener carga académica de los profesores
  export const obtenerCargaAcademicaProfesores = async (req, res) => {
    try {
      const cargaAcademica = await getCargaAcademicaProfesores();
      res.json(cargaAcademica);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la carga académica de los profesores" });
    }
  };
  
  // Obtener información completa de los profesores (salario, carga máxima, etc.)
  export const obtenerProfesoresCompleto = async (req, res) => {
    try {
      const profesoresCompleto = await getProfesoresCompleto();
      res.json(profesoresCompleto);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la información completa de los profesores" });
    }
  };

  export const obtenerProfesoresPorRegion = async (req, res) => {
    const { region } = req.params;
    try {
      const profesores = await getProfesoresByRegion(region);
      res.json(profesores);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener profesores por región" });
    }
  };