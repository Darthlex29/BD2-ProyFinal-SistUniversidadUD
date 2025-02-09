import { createGrupo, deleteGrupo, getGrupoById, getGrupos, getGruposConEstudiantes, getOfertaAcademicaPorSede, updateGrupo } from "../repositories/gupo.dao";

// Obtener todos los grupos
export const obtenerGrupos = async (req, res) => {
    try {
      const grupos = await getGrupos();
      res.json(grupos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los grupos" });
    }
  };
  
  // Obtener un grupo por ID
  export const obtenerGrupoPorId = async (req, res) => {
    const { cod_grupo } = req.params;
    try {
      const grupo = await getGrupoById(cod_grupo);
      if (!grupo) {
        return res.status(404).json({ error: "Grupo no encontrado" });
      }
      res.json(grupo);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el grupo" });
    }
  };
  
  // Crear un nuevo grupo
  export const crearGrupo = async (req, res) => {
    const { cod_grupo, cod_curso, nombre, semestre } = req.body;
    try {
      const nuevoGrupo = await createGrupo(cod_grupo, cod_curso, nombre, semestre);
      res.status(201).json(nuevoGrupo);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el grupo" });
    }
  };
  
  // Actualizar un grupo
  export const actualizarGrupo = async (req, res) => {
    const { cod_grupo } = req.params;
    const { cod_curso, nombre, semestre } = req.body;
    try {
      const grupoActualizado = await updateGrupo(cod_grupo, cod_curso, nombre, semestre);
      if (!grupoActualizado) {
        return res.status(404).json({ error: "Grupo no encontrado" });
      }
      res.json(grupoActualizado);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el grupo" });
    }
  };
  
  // Eliminar un grupo
  export const eliminarGrupo = async (req, res) => {
    const { cod_grupo } = req.params;
    try {
      const grupoEliminado = await deleteGrupo(cod_grupo);
      if (!grupoEliminado) {
        return res.status(404).json({ error: "Grupo no encontrado" });
      }
      res.json({ message: "Grupo eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el grupo" });
    }
  };
  
  // Obtener grupos con número de estudiantes inscritos
  export const obtenerGruposConEstudiantes = async (req, res) => {
    try {
      const gruposConEstudiantes = await getGruposConEstudiantes();
      res.json(gruposConEstudiantes);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los grupos con estudiantes" });
    }
  };
  
  // Obtener oferta académica por sede
  export const obtenerOfertaAcademicaPorSede = async (req, res) => {
    const { sede } = req.params;
    try {
      const ofertaAcademica = await getOfertaAcademicaPorSede(sede);
      res.json(ofertaAcademica);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la oferta académica" });
    }
  };