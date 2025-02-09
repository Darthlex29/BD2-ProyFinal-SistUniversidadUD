import pool from "../database/DB.Connection.js";

export const getEstudiantes = async () => {
  try {
    const result = await pool.query("SELECT * FROM estudiante");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    throw error;
  }
};

export const getEstudianteByDoc = async (numero_documento) => {
  try {
    const result = await pool.query(
      "SELECT * FROM estudiante WHERE numero_documento = $1",
      [numero_documento]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al obtener estudiante:", error);
    throw error;
  }
};

export const createEstudiante = async (
  numero_documento,
  nombre,
  apellido,
  correo,
  telefono,
  cod_pregrado,
  sede
) => {
  try {
    const existingStudent = await getEstudianteByDoc(numero_documento);
    if (existingStudent) {
      throw new Error(
        `El estudiante con documento ${numero_documento} ya existe`
      );
    }

    const result = await pool.query(
      `INSERT INTO estudiante 
            (numero_documento, nombre, apellido, correo, telefono, cod_pregrado, sede) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [numero_documento, nombre, apellido, correo, telefono, cod_pregrado, sede]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    throw error;
  }
};

export const updateEstudiante = async (
  numero_documento,
  nombre,
  apellido,
  correo,
  telefono,
  cod_pregrado,
  sede
) => {
  try {
    const existingStudent = await getEstudianteByDoc(numero_documento);
    if (!existingStudent) {
      throw new Error(
        `No se encontró un estudiante con documento ${numero_documento}`
      );
    }

    const result = await pool.query(
      `UPDATE estudiante SET 
          nombre = $2, apellido = $3, correo = $4, telefono = $5, cod_pregrado = $6, sede = $7 
          WHERE numero_documento = $1 RETURNING *`,
      [numero_documento, nombre, apellido, correo, telefono, cod_pregrado, sede]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al actualizar estudiante:", error);
    throw error;
  }
};

export const deleteEstudiante = async (numero_documento) => {
  try {
    const result = await pool.query(
      "DELETE FROM estudiante WHERE numero_documento = $1 RETURNING *",
      [numero_documento]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al eliminar estudiante:", error);
    throw error;
  }
};

export const getEstudiantesConGrupos = async () => {
  try {
    const query = `
        SELECT e.*, g.nombre as nombre_grupo, c.nombre as nombre_curso
        FROM estudiante e
        INNER JOIN estudiante_grupo eg ON e.numero_documento = eg.numero_documento
        INNER JOIN grupo g ON eg.cod_grupo = g.cod_grupo
        INNER JOIN curso c ON g.cod_curso = c.cod_curso`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener estudiantes con grupos:", error);
    throw error;
  }
};

export const getEstudiantesConPregrado = async () => {
  try {
    const query = `
        SELECT e.*, p.nombre as nombre_pregrado 
        FROM estudiante e
        INNER JOIN pregrado p ON e.cod_pregrado = p.cod_pregrado`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener estudiantes con pregrado:", error);
    throw error;
  }
};

export const getEstudiantesByRegion = async (region) => {
  try {
    const result = await pool.query(
      "SELECT * FROM estudiante WHERE region::text = $1",
      [region]
    );
    return result.rows;
  } catch (error) {
    console.error("Error al obtener estudiantes por región:", error);
    throw error;
  }
};

