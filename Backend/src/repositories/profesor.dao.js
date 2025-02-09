import pool from "../database/DB.Connection.js";

export const getProfesores = async () => {
  try {
    const result = await pool.query("SELECT * FROM profesor");
    return result.rows;
  } catch (error) {
    console.error("Error al obtener profesores:", error);
    throw error;
  }
};

export const getProfesorByDoc = async (numero_documento) => {
  try {
    const result = await pool.query(
      "SELECT * FROM profesor WHERE numero_documento = $1",
      [numero_documento]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error al obtener profesor:", error);
    throw error;
  }
};

export const createProfesor = async (
  numero_documento,
  nombre,
  direccion,
  categoria,
  telefono,
  email,
  sede
) => {
  try {
    const query = `
      INSERT INTO profesor 
      (numero_documento, nombre, direccion, categoria, telefono, e_mail, sede) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`;
    const values = [numero_documento, nombre, direccion, categoria, telefono, email, sede];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error al crear profesor:", error);
    throw error;
  }
};

export const updateProfesor = async (
  numero_documento,
  nombre,
  direccion,
  categoria,
  telefono,
  email,
  sede
) => {
  try {
    const query = `
      UPDATE profesor SET 
      nombre = $2, direccion = $3, categoria = $4, telefono = $5, e_mail = $6, sede = $7 
      WHERE numero_documento = $1 
      RETURNING *`;
    const values = [numero_documento, nombre, direccion, categoria, telefono, email, sede];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error al actualizar profesor:", error);
    throw error;
  }
};

export const deleteProfesor = async (numero_documento) => {
  try {
    const result = await pool.query(
      "DELETE FROM profesor WHERE numero_documento = $1 RETURNING *",
      [numero_documento]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error al eliminar profesor:", error);
    throw error;
  }
};

export const getHorasProfesores = async () => {
  try {
    const query = `
      SELECT p.numero_documento, p.nombre, 
        COALESCE(json_agg(json_build_object(
          'asignatura', a.nombre_asignatura,
          'horas', d.n_horas
        )) FILTER (WHERE a.cod_asignatura IS NOT NULL), '[]') as asignaturas,
        COALESCE(SUM(d.n_horas), 0) as total_horas
      FROM profesor p
      LEFT JOIN dictar d ON p.numero_documento = d.cod_profesor
      LEFT JOIN asignatura a ON d.cod_asignatura = a.cod_asignatura
      GROUP BY p.numero_documento, p.nombre`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener relación de horas:", error);
    throw error;
  }
};

export const getCargaAcademicaProfesores = async () => {
  try {
    const query = `
      SELECT p.numero_documento, p.nombre, 
        COALESCE(SUM(d.n_horas), 0) as horas_asignadas, 
        COALESCE(cl.numero_maximo_horas, 0) as numero_maximo_horas
      FROM profesor p
      LEFT JOIN dictar d ON p.numero_documento = d.cod_profesor
      LEFT JOIN clasificacion cl ON p.categoria = cl.categoria
      GROUP BY p.numero_documento, p.nombre, cl.numero_maximo_horas`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener carga académica:", error);
    throw error;
  }
};

export const getProfesoresCompleto = async () => {
  try {
    const query = `
      SELECT p.*, COALESCE(n.salario, 0) as salario, 
        COALESCE(cl.numero_maximo_horas, 0) as numero_maximo_horas
      FROM profesor p
      LEFT JOIN nomina n ON p.numero_documento = n.numero_documento
      LEFT JOIN clasificacion cl ON p.categoria = cl.categoria`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener información completa de profesores:", error);
    throw error;
  }
};
