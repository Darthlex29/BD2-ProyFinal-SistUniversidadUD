import { useState, useEffect } from 'react';
import { getProfesores, createProfesor } from '../api/profesoresApi';

export function useProfesores() {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener profesores
  const fetchProfesores = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProfesores();
      setProfesores(data);
    } catch (err) {
      setError('Error al obtener profesores');
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar un profesor
  const addProfesor = async (nuevoProfesor) => {
    const { numero_documento, nombre, direccion, categoria, telefono, e_mail, sede } = nuevoProfesor;

    if (!numero_documento || !nombre || !direccion || !categoria || !telefono || !e_mail || !sede) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    setLoading(true);
    try {
      const response = await createProfesor({
        numero_documento,
        nombre,
        direccion,
        categoria,
        telefono,
        email: e_mail, // Se ajusta la clave para coincidir con la API
        sede,
      });

      setProfesores((prev) => [...prev, response]); // Agregar nuevo profesor a la lista
      return true; // Indica éxito
    } catch (err) {
      setError('Error al agregar profesor');
      return false; // Indica fallo
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfesores(); // Se ejecuta al montar el componente
  }, []);

  return { profesores, loading, error, fetchProfesores, addProfesor };
}


