import pool from "../database/DB.Connection.js";

export const getClasificaciones = async () => {
  try {
    const result = await pool.query("SELECT * FROM clasificacion");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener clasificaciones:", error);
    throw new Error("Error al obtener clasificaciones");
  }
};

export const getClasificacionByCat = async (categoria) => {
  try {
    const result = await pool.query("SELECT * FROM clasificacion WHERE categoria = $1", [categoria]);
    if (result.rows.length === 0) {
      throw new Error(`No se encontró clasificación con categoría: ${categoria}`);
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener clasificación:", error);
    throw error;
  }
};

export const createClasificacion = async (categoria, numero_maximo_horas, sueldo) => {
  try {
    const result = await pool.query(
      `INSERT INTO clasificacion 
      (categoria, numero_maximo_horas, sueldo) 
      VALUES ($1, $2, $3) RETURNING *`,
      [categoria, numero_maximo_horas, sueldo]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear clasificación:", error);
    throw new Error("Error al crear clasificación");
  }
};

export const updateClasificacion = async (categoria, numero_maximo_horas, sueldo) => {
  try {
    const result = await pool.query(
      `UPDATE clasificacion SET 
      numero_maximo_horas = $2, sueldo = $3 
      WHERE categoria = $1 RETURNING *`,
      [categoria, numero_maximo_horas, sueldo]
    );
    if (result.rows.length === 0) {
      throw new Error(`No se encontró clasificación con categoría: ${categoria}`);
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error al actualizar clasificación:", error);
    throw error;
  }
};

export const deleteClasificacion = async (categoria) => {
  try {
    const result = await pool.query("DELETE FROM clasificacion WHERE categoria = $1 RETURNING *", [categoria]);
    if (result.rows.length === 0) {
      throw new Error(`No se encontró clasificación con categoría: ${categoria}`);
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar clasificación:", error);
    throw error;
  }
};
