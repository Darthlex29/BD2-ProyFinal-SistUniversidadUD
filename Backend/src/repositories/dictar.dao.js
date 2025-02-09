import pool from "../database/DB.Connection.js";

// Obtener todos los dictados
export const getDictados = async () => {
  try {
    const result = await pool.query("SELECT * FROM dictar");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener dictados:", error);
    throw error;
  }
};

// Obtener dictados de un profesor específico
export const getDictadoByProfesor = async (cod_profesor) => {
  try {
    const result = await pool.query(
      "SELECT * FROM dictar WHERE cod_profesor = $1",
      [cod_profesor]
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener dictado por profesor:", error);
    throw error;
  }
};

// Crear un nuevo dictado
export const createDictado = async (cod_asignatura, cod_profesor, n_horas, sede) => {
  try {
    const result = await pool.query(
      `INSERT INTO dictar (cod_asignatura, cod_profesor, n_horas, sede) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [cod_asignatura, cod_profesor, n_horas, sede]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear dictado:", error);
    throw error;
  }
};

// Actualizar un dictado (número de horas y sede)
export const updateDictado = async (cod_asignatura, cod_profesor, n_horas, sede) => {
  try {
    const result = await pool.query(
      `UPDATE dictar 
       SET n_horas = $3, sede = $4 
       WHERE cod_asignatura = $1 AND cod_profesor = $2 
       RETURNING *`,
      [cod_asignatura, cod_profesor, n_horas, sede]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al actualizar dictado:", error);
    throw error;
  }
};

// Eliminar un dictado
export const deleteDictado = async (cod_asignatura, cod_profesor) => {
  try {
    const result = await pool.query(
      "DELETE FROM dictar WHERE cod_asignatura = $1 AND cod_profesor = $2 RETURNING *",
      [cod_asignatura, cod_profesor]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar dictado:", error);
    throw error;
  }
};
