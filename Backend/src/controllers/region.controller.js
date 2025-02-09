import regionConfig from "../util/region.util.js";

// Obtener la región actual
export const getRegion = (req, res) => {
    try {
      const region = regionConfig.getRegion();
      res.json({ region });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la región" });
    }
  };
  
  // Actualizar la región
  export const updateRegion = (req, res) => {
    try {
      const { region } = req.body;
      if (!region) {
        return res.status(400).json({ error: "Se debe enviar el valor de la región" });
      }
      regionConfig.setRegion(region);
      res.json({ region: regionConfig.getRegion() });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la región" });
    }
  };