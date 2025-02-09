import pool from "../database/DB.Connection.js";

export const getGrupos = async () => {
  try {
    const result = await pool.query("SELECT * FROM grupo");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los grupos:", error);
    throw new Error("No se pudieron obtener los grupos");
  }
};

export const getGrupoById = async (cod_grupo) => {
  try {
    const result = await pool.query("SELECT * FROM grupo WHERE cod_grupo = $1", [cod_grupo]);
    if (result.rows.length === 0) throw new Error("Grupo no encontrado");
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener el grupo:", error);
    throw error;
  }
};

export const createGrupo = async (cod_grupo, cod_curso, nombre, semestre) => {
  try {
    const result = await pool.query(
      `INSERT INTO grupo (cod_grupo, cod_curso, nombre, semestre) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [cod_grupo, cod_curso, nombre, semestre]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear el grupo:", error);
    throw new Error("No se pudo crear el grupo");
  }
};

export const updateGrupo = async (cod_grupo, cod_curso, nombre, semestre) => {
  try {
    const result = await pool.query(
      `UPDATE grupo 
       SET cod_curso = $2, nombre = $3, semestre = $4 
       WHERE cod_grupo = $1 RETURNING *`,
      [cod_grupo, cod_curso, nombre, semestre]
    );
    if (result.rows.length === 0) throw new Error("Grupo no encontrado");
    return result.rows[0];
  } catch (error) {
    console.error("Error al actualizar el grupo:", error);
    throw error;
  }
};

export const deleteGrupo = async (cod_grupo) => {
  try {
    const result = await pool.query("DELETE FROM grupo WHERE cod_grupo = $1 RETURNING *", [cod_grupo]);
    if (result.rows.length === 0) throw new Error("Grupo no encontrado");
    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar el grupo:", error);
    throw error;
  }
};

export const getGruposConEstudiantes = async () => {
  try {
    const query = `
      SELECT 
        g.cod_grupo, 
        g.nombre AS nombre_grupo,
        g.semestre,
        g.cod_curso, 
        c.nombre AS nombre_curso,       
        COUNT(eg.numero_documento) AS estudiantes_inscritos
      FROM grupo g
      INNER JOIN curso c ON g.cod_curso = c.cod_curso
      LEFT JOIN estudiante_grupo eg ON g.cod_grupo = eg.cod_grupo
      GROUP BY g.cod_grupo, g.nombre, g.semestre, g.cod_curso, c.nombre;
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los grupos con estudiantes:", error);
    throw new Error("No se pudieron obtener los grupos con estudiantes");
  }
};

export const getOfertaAcademicaPorSede = async (sede) => {
  try {
    const query = `
      SELECT c.nombre AS curso, a.nombre_asignatura, g.nombre AS grupo, 
             p.nombre AS profesor, d.n_horas
      FROM curso c
      INNER JOIN asignatura a ON c.cod_curso = a.cod_curso
      LEFT JOIN grupo g ON c.cod_curso = g.cod_curso
      LEFT JOIN dictar d ON a.cod_asignatura = d.cod_asignatura
      LEFT JOIN profesor p ON d.cod_profesor = p.numero_documento
      WHERE c.sede = $1
    `;
    const result = await pool.query(query, [sede]);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener la oferta académica:", error);
    throw new Error("No se pudo obtener la oferta académica");
  }
};
