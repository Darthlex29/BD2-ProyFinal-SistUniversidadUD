import {
    getPregrados,
    getPregradoById,
    createPregrado,
    updatePregrado,
    deletePregrado
  } from "../repositories/pregrado.dao.js";
  
  // Obtener todos los pregrados
  export const obtenerPregrados = async (req, res) => {
    try {
      const pregrados = await getPregrados();
      res.json(pregrados);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los pregrados" });
    }
  };
  
  // Obtener un pregrado por ID
  export const obtenerPregradoPorId = async (req, res) => {
    const { id } = req.params;
    try {
      const pregrado = await getPregradoById(id);
      if (!pregrado) {
        return res.status(404).json({ error: "Pregrado no encontrado" });
      }
      res.json(pregrado);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el pregrado" });
    }
  };
  
  // Crear un nuevo pregrado
  export const crearPregrado = async (req, res) => {
    const { nombre, edad } = req.body;
    try {
      const nuevoPregrado = await createPregrado(nombre, edad);
      res.status(201).json(nuevoPregrado);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el pregrado" });
    }
  };
  
  // Actualizar un pregrado
  export const actualizarPregrado = async (req, res) => {
    const { id } = req.params;
    const { nombre, edad } = req.body;
    try {
      const pregradoActualizado = await updatePregrado(id, nombre, edad);
      if (!pregradoActualizado) {
        return res.status(404).json({ error: "Pregrado no encontrado" });
      }
      res.json(pregradoActualizado);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el pregrado" });
    }
  };
  
  // Eliminar un pregrado
  export const eliminarPregrado = async (req, res) => {
    const { id } = req.params;
    try {
      const pregradoEliminado = await deletePregrado(id);
      if (!pregradoEliminado) {
        return res.status(404).json({ error: "Pregrado no encontrado" });
      }
      res.json({ message: "Pregrado eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el pregrado" });
    }
  };
  