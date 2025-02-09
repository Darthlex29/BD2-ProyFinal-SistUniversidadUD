import * as clasificacionDAO from "../repositories/clasificacion.dao.js";

export const getClasificaciones = async (req, res) => {
  try {
    const clasificaciones = await clasificacionDAO.getClasificaciones();
    res.json(clasificaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClasificacionByCat = async (req, res) => {
  try {
    const { categoria } = req.params;
    const clasificacion = await clasificacionDAO.getClasificacionByCat(categoria);
    res.json(clasificacion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createClasificacion = async (req, res) => {
  try {
    const { categoria, numero_maximo_horas, sueldo } = req.body;
    const nuevaClasificacion = await clasificacionDAO.createClasificacion(categoria, numero_maximo_horas, sueldo);
    res.status(201).json(nuevaClasificacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateClasificacion = async (req, res) => {
  try {
    const { categoria } = req.params;
    const { numero_maximo_horas, sueldo } = req.body;
    const clasificacionActualizada = await clasificacionDAO.updateClasificacion(categoria, numero_maximo_horas, sueldo);
    res.json(clasificacionActualizada);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteClasificacion = async (req, res) => {
  try {
    const { categoria } = req.params;
    const clasificacionEliminada = await clasificacionDAO.deleteClasificacion(categoria);
    res.json(clasificacionEliminada);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
