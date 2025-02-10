import {
  getPregrados,
  getPregradoById,
  createPregrado,
  updatePregrado,
  deletePregrado,
  getPregradosByRegion
} from "../repositories/pregrado.dao.js";

// Obtener todos los pregrados
export const obtenerPregrados = async (req, res) => {
  try {
    const pregrados = await getPregrados();
    res.json(pregrados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un pregrado por código
export const obtenerPregradoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    console.log({id:id, req_params: req.params}); 
    const pregrado = await getPregradoById(id);
    if (!pregrado) {
      return res.status(404).json({ error: "Pregrado no encontrado" });
    }
    res.json(pregrado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo pregrado
export const crearPregradoController = async (req, res) => {
  try {
    const { id, nombre, creditos, nota_minima, sede } = req.body;
    const nuevoPregrado = await createPregrado(id, nombre, creditos, nota_minima, sede);
    res.status(201).json(nuevoPregrado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un pregrado
export const actualizarPregradoController = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, creditos, nota_minima, sede } = req.body;
    const pregradoActualizado = await updatePregrado(id, nombre, creditos, nota_minima, sede);
    if (!pregradoActualizado) {
      return res.status(404).json({ error: "Pregrado no encontrado" });
    }
    res.json(pregradoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un pregrado
export const eliminarPregradoController = async (req, res) => {
  try {
    const { id } = req.params;
    const pregradoEliminado = await deletePregrado(id);
    if (!pregradoEliminado) {
      return res.status(404).json({ error: "Pregrado no encontrado" });
    }
    res.json({ message: "Pregrado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener pregrados filtrados por región
export const obtenerPregradosPorRegionController = async (req, res) => {
  try {
    // Si se envía la región por parámetro, se utiliza; de lo contrario, se podría usar un valor por defecto.
    const { region } = req.params;
    const pregrados = await getPregradosByRegion(region);
    res.json(pregrados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
