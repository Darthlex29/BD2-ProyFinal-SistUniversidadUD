import pool from "../database/DB.Connection.js";

export const getAsignaturas = async () => {
  try {
    const result = await pool.query("SELECT * FROM asignatura");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener asignaturas:", error);
    throw error;
  }
};

export const getAsignaturaById = async (cod_asignatura) => {
  try {
    const result = await pool.query(
      "SELECT * FROM asignatura WHERE cod_asignatura = $1",
      [cod_asignatura]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener asignatura:", error);
    throw error;
  }
};

export const createAsignatura = async (
  cod_asignatura,
  nombre_asignatura,
  cod_pregrado,
  cod_curso,
  horas_semanales,
  sede
) => {
  try {
    const result = await pool.query(
      `INSERT INTO asignatura 
        (cod_asignatura, nombre_asignatura, cod_pregrado, cod_curso, horas_semanales, sede) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        cod_asignatura,
        nombre_asignatura,
        cod_pregrado,
        cod_curso,
        horas_semanales,
        sede,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear asignatura:", error);
    throw error;
  }
};

export const updateAsignatura = async (
  cod_asignatura,
  nombre_asignatura,
  cod_pregrado,
  cod_curso,
  horas_semanales,
  sede
) => {
  try {
    const result = await pool.query(
      `UPDATE asignatura SET 
        nombre_asignatura = $2, cod_pregrado = $3, cod_curso = $4, horas_semanales = $5, sede = $6 
        WHERE cod_asignatura = $1 RETURNING *`,
      [
        cod_asignatura,
        nombre_asignatura,
        cod_pregrado,
        cod_curso,
        horas_semanales,
        sede,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al actualizar asignatura:", error);
    throw error;
  }
};

export const deleteAsignatura = async (cod_asignatura) => {
  try {
    const result = await pool.query(
      "DELETE FROM asignatura WHERE cod_asignatura = $1 RETURNING *",
      [cod_asignatura]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar asignatura:", error);
    throw error;
  }
};

export const getAsignaturasConProfesores = async () => {
  try {
    const query = `
        SELECT a.*, p.nombre as nombre_profesor, d.n_horas
        FROM asignatura a
        LEFT JOIN dictar d ON a.cod_asignatura = d.cod_asignatura
        LEFT JOIN profesor p ON d.cod_profesor = p.numero_documento`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener asignaturas con profesores:", error);
    throw error;
  }
};

export const getAsignaturasByRegion = async (region) => {
  try {
    const result = await pool.query(
      "SELECT * FROM asignatura WHERE region::text = $1",
      [region]
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener asignaturas por región:", error);
    throw error;
  }
};
