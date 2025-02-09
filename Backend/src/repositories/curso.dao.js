import pool from "../database/DB.Connection.js";

export const getCursos = async () => {
  try {
      const result = await pool.query("SELECT * FROM curso");
      return result.rows;
  } catch (error) {
      console.error("Error al obtener cursos:", error);
      throw new Error("No se pudieron obtener los cursos");
  }
};

export const getCursoById = async (cod_curso) => {
  try {
      const result = await pool.query("SELECT * FROM curso WHERE cod_curso = $1", [cod_curso]);
      if (result.rows.length === 0) {
          throw new Error(`No se encontró el curso con código: ${cod_curso}`);
      }
      return result.rows[0];
  } catch (error) {
      console.error("Error al obtener curso:", error);
      throw error;
  }
};

export const createCurso = async (cod_pregrado, nombre, capacidad_estudiantes, sede) => {
  try {
      const result = await pool.query(
          `INSERT INTO curso (cod_pregrado, nombre, capacidad_estudiantes, sede) 
           VALUES ($1, $2, $3, $4) RETURNING *`,
          [cod_pregrado, nombre, capacidad_estudiantes, sede]
      );
      return result.rows[0];
  } catch (error) {
      console.error("Error al crear curso:", error);
      throw new Error("No se pudo crear el curso");
  }
};

export const updateCurso = async (cod_curso, cod_pregrado, nombre, capacidad_estudiantes, sede) => {
  try {
      const result = await pool.query(
          `UPDATE curso SET 
           cod_pregrado = $2, nombre = $3, capacidad_estudiantes = $4, sede = $5 
           WHERE cod_curso = $1 RETURNING *`,
          [cod_curso, cod_pregrado, nombre, capacidad_estudiantes, sede]
      );
      if (result.rows.length === 0) {
          throw new Error(`No se encontró el curso con código: ${cod_curso}`);
      }
      return result.rows[0];
  } catch (error) {
      console.error("Error al actualizar curso:", error);
      throw error;
  }
};

export const deleteCurso = async (cod_curso) => {
  try {
      const result = await pool.query("DELETE FROM curso WHERE cod_curso = $1 RETURNING *", [cod_curso]);
      if (result.rows.length === 0) {
          throw new Error(`No se encontró el curso con código: ${cod_curso}`);
      }
      return result.rows[0];
  } catch (error) {
      console.error("Error al eliminar curso:", error);
      throw error;
  }
};

export const verificarDisponibilidadCurso = async (cod_curso) => {
  try {
      const query = `
          SELECT c.capacidad_estudiantes, 
                 COUNT(eg.numero_documento) AS inscritos,
                 (c.capacidad_estudiantes - COUNT(eg.numero_documento)) AS disponibles
          FROM curso c
          LEFT JOIN grupo g ON c.cod_curso = g.cod_curso
          LEFT JOIN estudiante_grupo eg ON g.cod_grupo = eg.cod_grupo
          WHERE c.cod_curso = $1
          GROUP BY c.capacidad_estudiantes`;
      const result = await pool.query(query, [cod_curso]);
      if (result.rows.length === 0) {
          throw new Error(`No se encontró información sobre el curso con código: ${cod_curso}`);
      }
      return result.rows[0];
  } catch (error) {
      console.error("Error al verificar disponibilidad:", error);
      throw error;
  }
};

export const getCursosDetallados = async () => {
  try {
      const query = `
          SELECT 
              c.cod_curso, 
              c.cod_pregrado, 
              c.nombre, 
              c.capacidad_estudiantes, 
              c.sede,
              p.nombre AS nombre_pregrado,      
              COUNT(g.cod_grupo) AS cantidad_grupos
          FROM curso c
          INNER JOIN pregrado p ON c.cod_pregrado = p.cod_pregrado
          LEFT JOIN grupo g ON c.cod_curso = g.cod_curso
          GROUP BY 
              c.cod_curso, c.cod_pregrado, c.nombre, 
              c.capacidad_estudiantes, c.sede, 
              p.nombre;
          `;
      const result = await pool.query(query);
      return result.rows;
  } catch (error) {
      console.error("Error al obtener cursos detallados:", error);
      throw new Error("No se pudieron obtener los cursos detallados");
  }
};