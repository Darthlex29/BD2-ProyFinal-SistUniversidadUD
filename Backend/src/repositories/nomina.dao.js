import pool from "../database/DB.Connection.js";

export const getNominas = async () => {
  try {
    const result = await pool.query("SELECT * FROM nomina");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener nóminas:", error);
    throw error;
  }
};

export const getNominaByDoc = async (numero_documento) => {
  try {
    const result = await pool.query("SELECT * FROM nomina WHERE numero_documento = $1", [numero_documento]);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error al obtener nómina:", error);
    throw error;
  }
};

export const createNomina = async (numero_documento, categoria, salario) => {
  try {
    const result = await pool.query(
      `INSERT INTO nomina (numero_documento, categoria, salario) 
       VALUES ($1, $2, $3) RETURNING *`,
      [numero_documento, categoria, salario]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear nómina:", error);
    throw error;
  }
};

export const updateNomina = async (numero_documento, categoria, salario) => {
  try {
    const result = await pool.query(
      `UPDATE nomina SET categoria = $2, salario = $3 
       WHERE numero_documento = $1 RETURNING *`,
      [numero_documento, categoria, salario]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error al actualizar nómina:", error);
    throw error;
  }
};

export const deleteNomina = async (numero_documento) => {
  try {
    const result = await pool.query(
      "DELETE FROM nomina WHERE numero_documento = $1 RETURNING *",
      [numero_documento]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error al eliminar nómina:", error);
    throw error;
  }
};
