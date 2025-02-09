import { createNomina, deleteNomina, getNominaByDoc, getNominas, updateNomina } from "../repositories/nomina.dao.js";

  // Obtener todas las nóminas
  export const obtenerNominas = async (req, res) => {
    try {
      const nominas = await getNominas();
      res.json(nominas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las nóminas" });
    }
  };
  
  // Obtener una nómina por número de documento
  export const obtenerNominaPorDoc = async (req, res) => {
    const { numero_documento } = req.params;
    try {
      const nomina = await getNominaByDoc(numero_documento);
      if (!nomina) {
        return res.status(404).json({ error: "Nómina no encontrada" });
      }
      res.json(nomina);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la nómina" });
    }
  };
  
  // Crear una nueva nómina
  export const crearNomina = async (req, res) => {
    const { numero_documento, categoria, salario } = req.body;
    try {
      const nuevaNomina = await createNomina(numero_documento, categoria, salario);
      res.status(201).json(nuevaNomina);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la nómina" });
    }
  };
  
  // Actualizar una nómina
  export const actualizarNomina = async (req, res) => {
    const { numero_documento } = req.params;
    const { categoria, salario } = req.body;
    try {
      const nominaActualizada = await updateNomina(numero_documento, categoria, salario);
      if (!nominaActualizada) {
        return res.status(404).json({ error: "Nómina no encontrada" });
      }
      res.json(nominaActualizada);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la nómina" });
    }
  };
  
  // Eliminar una nómina
  export const eliminarNomina = async (req, res) => {
    const { numero_documento } = req.params;
    try {
      const nominaEliminada = await deleteNomina(numero_documento);
      if (!nominaEliminada) {
        return res.status(404).json({ error: "Nómina no encontrada" });
      }
      res.json({ message: "Nómina eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la nómina" });
    }
  };
  