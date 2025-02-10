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

// Obtener un pregrado por código (clave primaria)
export const getPregradoById = async (cod_pregrado) => {
  try {
    const result = await pool.query("SELECT * FROM pregrado WHERE cod_pregrado = $1", [cod_pregrado]);
    console.log(result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener pregrado por código:", error);
    throw error;
  }
};

// Crear un nuevo pregrado
export const createPregrado = async (cod_pregrado, nombre, creditos, nota_minima, sede) => {
  try {
    const result = await pool.query(
      "INSERT INTO pregrado (cod_pregrado, nombre, creditos, nota_minima, sede) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [cod_pregrado, nombre, creditos, nota_minima, sede]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear pregrado:", error);
    throw error;
  }
};

// Actualizar un pregrado
export const updatePregrado = async (cod_pregrado, nombre, creditos, nota_minima, sede) => {
  try {
    const result = await pool.query(
      "UPDATE pregrado SET nombre = $2, creditos = $3, nota_minima = $4, sede = $5 WHERE cod_pregrado = $1 RETURNING *",
      [cod_pregrado, nombre, creditos, nota_minima, sede]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al actualizar pregrado:", error);
    throw error;
  }
};

// Eliminar un pregrado
export const deletePregrado = async (cod_pregrado) => {
  try {
    const result = await pool.query("DELETE FROM pregrado WHERE cod_pregrado = $1 RETURNING *", [cod_pregrado]);
    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar pregrado:", error);
    throw error;
  }
};

// Obtener pregrados filtrados por región
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
