import React, { useState } from 'react';
import { useProfesores } from '../hooks/useProfesores';

function Profesores() {
  const { profesores, loading, error, addProfesor } = useProfesores();
  const [search, setSearch] = useState('');
  const [filtroSede, setFiltroSede] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');

  // Estado para el nuevo profesor
  const [nuevoProfesor, setNuevoProfesor] = useState({
    numero_documento: '',
    nombre: '',
    direccion: '',
    categoria: '',
    telefono: '',
    e_mail: '',
    sede: '',
  });

  // Manejo de cambios en inputs
  const handleInputChange = (e) => {
    setNuevoProfesor({ ...nuevoProfesor, [e.target.name]: e.target.value });
  };

  // Agregar nuevo profesor
  const handleAgregarProfesor = async () => {
    const exito = await addProfesor(nuevoProfesor);
    if (exito) {
      setNuevoProfesor({
        numero_documento: '',
        nombre: '',
        direccion: '',
        categoria: '',
        telefono: '',
        e_mail: '',
        sede: '',
      });
    }
  };

  // Filtrado de profesores según búsqueda y filtros
  const profesoresFiltrados = profesores.filter((profesor) =>
    profesor.nombre.toLowerCase().includes(search.toLowerCase()) ||
    profesor.numero_documento.includes(search)
  ).filter((profesor) =>
    (filtroSede ? profesor.sede === filtroSede : true) &&
    (filtroCategoria ? profesor.categoria === filtroCategoria : true)
  );

  return (
    <section className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Gestión de Profesores
      </h1>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-wrap gap-4 w-full mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o documento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        />

        <select
          value={filtroSede}
          onChange={(e) => setFiltroSede(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        >
          <option value="">Filtrar por sede</option>
          <option value="Bosa">Bosa</option>
          <option value="Chapinero">Chapinero</option>
          <option value="Macarena">Macarena</option>
        </select>

        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        >
          <option value="">Filtrar por categoría</option>
          <option value="Titular">Titular</option>
          <option value="Asociado">Asociado</option>
          <option value="Asistente">Asistente</option>
        </select>
      </div>

      {/* Tabla de Profesores */}
      <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600 mb-6">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border border-gray-300 dark:border-gray-600 p-3">Documento</th>
            <th className="border border-gray-300 dark:border-gray-600 p-3">Nombre</th>
            <th className="border border-gray-300 dark:border-gray-600 p-3">Dirección</th>
            <th className="border border-gray-300 dark:border-gray-600 p-3">Teléfono</th>
            <th className="border border-gray-300 dark:border-gray-600 p-3">Email</th>
            <th className="border border-gray-300 dark:border-gray-600 p-3">Categoría</th>
            <th className="border border-gray-300 dark:border-gray-600 p-3">Sede</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center p-4">Cargando...</td>
            </tr>
          ) : profesoresFiltrados.length > 0 ? (
            profesoresFiltrados.map((profesor) => (
              <tr key={profesor.numero_documento} className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-800 dark:even:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-600 p-3">{profesor.numero_documento}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">{profesor.nombre}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">{profesor.direccion}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">{profesor.telefono}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">{profesor.e_mail}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">{profesor.categoria}</td>
                <td className="border border-gray-300 dark:border-gray-600 p-3">{profesor.sede}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">No hay profesores disponibles</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Formulario para agregar profesor */}
      <div className="flex flex-wrap gap-4 w-full bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
        <input type="text" name="numero_documento" placeholder="Documento" value={nuevoProfesor.numero_documento} onChange={handleInputChange} className="p-3 border rounded-lg w-full md:w-auto" />
        <input type="text" name="nombre" placeholder="Nombre" value={nuevoProfesor.nombre} onChange={handleInputChange} className="p-3 border rounded-lg w-full md:w-auto" />
        <input type="text" name="direccion" placeholder="Dirección" value={nuevoProfesor.direccion} onChange={handleInputChange} className="p-3 border rounded-lg w-full md:w-auto" />
        <input type="text" name="telefono" placeholder="Teléfono" value={nuevoProfesor.telefono} onChange={handleInputChange} className="p-3 border rounded-lg w-full md:w-auto" />
        <input type="email" name="e_mail" placeholder="Email" value={nuevoProfesor.e_mail} onChange={handleInputChange} className="p-3 border rounded-lg w-full md:w-auto" />
        <select name="categoria" value={nuevoProfesor.categoria} onChange={handleInputChange} className="p-3 border rounded-lg w-full md:w-auto">
          <option value="">Categoría</option>
          <option value="Titular">Titular</option>
          <option value="Asociado">Asociado</option>
          <option value="Asistente">Asistente</option>
        </select>
        <select name="sede" value={nuevoProfesor.sede} onChange={handleInputChange} className="p-3 border rounded-lg w-full md:w-auto">
          <option value="">Sede</option>
          <option value="Bosa">Bosa</option>
          <option value="Chapinero">Chapinero</option>
          <option value="Macarena">Macarena</option>
        </select>
        <button onClick={handleAgregarProfesor} className="bg-green-400 text-white p-3 rounded-lg hover:bg-green-600">
          Crear Profesor
        </button>
      </div>
    </section>
  );
}

export default Profesores;
