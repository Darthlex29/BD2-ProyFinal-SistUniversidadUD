import { 
    getDictados, 
    getDictadoByProfesor, 
    createDictado, 
    updateDictado, 
    deleteDictado 
  } from "../repositories/dictar.dao.js";
  
  // Obtener todos los dictados
  export const getAllDictados = async (req, res) => {
    try {
      const dictados = await getDictados();
      res.json(dictados);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener dictados" });
    }
  };
  
  // Obtener dictados de un profesor específico
  export const getDictadosPorProfesor = async (req, res) => {
    const { cod_profesor } = req.params;
    try {
      const dictados = await getDictadoByProfesor(cod_profesor);
      res.json(dictados);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener dictado del profesor" });
    }
  };
  
  // Crear un nuevo dictado
  export const createNewDictado = async (req, res) => {
    const { cod_asignatura, cod_profesor, n_horas, sede } = req.body;
    try {
      const nuevoDictado = await createDictado(cod_asignatura, cod_profesor, n_horas, sede);
      res.status(201).json(nuevoDictado);
    } catch (error) {
      res.status(500).json({ error: "Error al crear dictado" });
    }
  };
  
  // Actualizar un dictado
  export const updateExistingDictado = async (req, res) => {
    const { cod_asignatura, cod_profesor, n_horas, sede } = req.body;
    try {
      const dictadoActualizado = await updateDictado(cod_asignatura, cod_profesor, n_horas, sede);
      if (dictadoActualizado) {
        res.json(dictadoActualizado);
      } else {
        res.status(404).json({ error: "Dictado no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar dictado" });
    }
  };
  
  // Eliminar un dictado
  export const deleteExistingDictado = async (req, res) => {
    const { cod_asignatura, cod_profesor } = req.body;
    try {
      const dictadoEliminado = await deleteDictado(cod_asignatura, cod_profesor);
      if (dictadoEliminado) {
        res.json({ message: "Dictado eliminado correctamente" });
      } else {
        res.status(404).json({ error: "Dictado no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar dictado" });
    }
  };

  export const obtenerDictadosPorRegion = async (req, res) => {
    const { region } = req.params;
    try {
      const dictados = await getDictadosByRegion(region);
      res.json(dictados);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener dictado" });
    }
  };