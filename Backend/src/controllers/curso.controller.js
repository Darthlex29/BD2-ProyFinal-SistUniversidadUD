import * as cursoDAO from "../repositories/curso.dao.js";

export const getCursos = async (req, res) => {
    try {
        const cursos = await cursoDAO.getCursos();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCursoById = async (req, res) => {
    try {
        const { cod_curso } = req.params;
        const curso = await cursoDAO.getCursoById(cod_curso);
        res.json(curso);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const createCurso = async (req, res) => {
    try {
        const { cod_pregrado, nombre, capacidad_estudiantes, sede } = req.body;
        const nuevoCurso = await cursoDAO.createCurso(cod_pregrado, nombre, capacidad_estudiantes, sede);
        res.status(201).json(nuevoCurso);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateCurso = async (req, res) => {
    try {
        const { cod_curso } = req.params;
        const { cod_pregrado, nombre, capacidad_estudiantes, sede } = req.body;
        const cursoActualizado = await cursoDAO.updateCurso(cod_curso, cod_pregrado, nombre, capacidad_estudiantes, sede);
        res.json(cursoActualizado);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const deleteCurso = async (req, res) => {
    try {
        const { cod_curso } = req.params;
        const cursoEliminado = await cursoDAO.deleteCurso(cod_curso);
        res.json(cursoEliminado);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const verificarDisponibilidadCurso = async (req, res) => {
    try {
        const { cod_curso } = req.params;
        const disponibilidad = await cursoDAO.verificarDisponibilidadCurso(cod_curso);
        res.json(disponibilidad);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const getCursosDetallados = async (req, res) => {
    try {
        const cursosDetallados = await cursoDAO.getCursosDetallados();
        res.json(cursosDetallados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
