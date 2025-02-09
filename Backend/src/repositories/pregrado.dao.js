import pool from "../database/DB.Connection.js";

// Obtener todos los pregrados
export const getPregrados = async () => {
  try {
    const result = await pool.query("SELECT * FROM pregrado");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener pregrados:", error);
    throw error;
  }
};

// Obtener un pregrado por ID
export const getPregradoById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM pregrado WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener pregrado por ID:", error);
    throw error;
  }
};

// Crear un nuevo pregrado
export const createPregrado = async (nombre, edad) => {
  try {
    const result = await pool.query(
      "INSERT INTO pregrado (nombre, edad) VALUES ($1, $2) RETURNING *",
      [nombre, edad]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear pregrado:", error);
    throw error;
  }
};

// Actualizar un pregrado
export const updatePregrado = async (id, nombre, edad) => {
  try {
    const result = await pool.query(
      "UPDATE pregrado SET nombre = $1, edad = $2 WHERE id = $3 RETURNING *",
      [nombre, edad, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al actualizar pregrado:", error);
    throw error;
  }
};

// Eliminar un pregrado
export const deletePregrado = async (id) => {
  try {
    const result = await pool.query("DELETE FROM pregrado WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar pregrado:", error);
    throw error;
  }
};

export const getPregradosByRegion = async (region) => {
  try {
    const result = await pool.query(
      "SELECT * FROM pregrado WHERE region::text = $1",
      [region]
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener pregrados por región:", error);
    throw error;
  }
};