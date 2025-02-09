-- ================================================
-- Archivo: inserts_completo_udistrital.sql
-- Descripción: Inserta registros en las tablas de la base de datos
--              de la Universidad Distrital, organizados por sede y
--              ajustados a la oferta académica real.
-- ================================================

-- =================================================
-- 1. INSERTS PARA LA TABLA pregrado
-- (cod_pregrado, nombre, creditos, nota_minima, sede)
-- Se agrupan por facultades y sede:
--  * Facultad de Ingeniería (Sede Chapinero)
--  * Facultad de Ciencias y Educación (Sede Macarena)
--  * Facultad del Medio Ambiente y Recursos Naturales (Sede Bosa)
-- =================================================
INSERT INTO pregrado (cod_pregrado, nombre, creditos, nota_minima, sede)
VALUES
    -- Facultad de Ingeniería - Sede Chapinero
    (1, 'Ingeniería de Sistemas', 160, 3.0, 'Chapinero'),
    (2, 'Ingeniería Industrial', 150, 3.0, 'Chapinero'),
    (3, 'Ingeniería Electrónica', 150, 3.0, 'Chapinero'),
    (4, 'Ingeniería Mecánica', 150, 3.0, 'Chapinero'),
    (5, 'Ingeniería Civil', 150, 3.0, 'Chapinero'),
    (6, 'Ingeniería Catastral y Geodesia', 150, 3.0, 'Chapinero'),

    -- Facultad de Ciencias y Educación - Sede Macarena
    (11, 'Licenciatura en Biología', 150, 3.0, 'Macarena'),
    (12, 'Licenciatura en Física', 150, 3.0, 'Macarena'),
    (13, 'Licenciatura en Matemáticas', 150, 3.0, 'Macarena'),
    (14, 'Licenciatura en Química', 150, 3.0, 'Macarena'),
    (15, 'Licenciatura en Ciencias Sociales', 150, 3.0, 'Macarena'),
    (16, 'Licenciatura en Educación Artística', 150, 3.0, 'Macarena'),
    (17, 'Licenciatura en Educación Infantil', 150, 3.0, 'Macarena'),
    (18, 'Licenciatura en Humanidades y Lengua Castellana', 150, 3.0, 'Macarena'),
    (19, 'Licenciatura en Filosofía', 150, 3.0, 'Macarena'),
    (20, 'Licenciatura en Lenguas Extranjeras con Énfasis en Inglés', 150, 3.0, 'Macarena'),

    -- Facultad del Medio Ambiente y Recursos Naturales - Sede Bosa
    (21, 'Administración Ambiental', 140, 3.0, 'Bosa'),
    (22, 'Ingeniería Ambiental', 150, 3.0, 'Bosa'),
    (23, 'Ingeniería Forestal', 150, 3.0, 'Bosa'),
    (24, 'Ingeniería Sanitaria', 150, 3.0, 'Bosa'),
    (25, 'Tecnología en Gestión Ambiental y Servicios Públicos', 120, 3.0, 'Bosa'),
    (26, 'Tecnología en Saneamiento Ambiental', 120, 3.0, 'Bosa');

-- =================================================
-- 2. INSERTS PARA LA TABLA estudiante
-- (numero_documento, nombre, apellido, correo, telefono, cod_pregrado, sede)
-- Se asume que los códigos de pregrado existen como se insertaron.
-- =================================================
INSERT INTO estudiante (numero_documento, nombre, apellido, correo, telefono, cod_pregrado, sede)
VALUES
  (1001, 'Laura', 'Martinez', 'laura.martinez@udistrital.edu.co', '3111111111', 1, 'Chapinero'),
  (1002, 'Andres', 'Garcia', 'andres.garcia@udistrital.edu.co', '3111111112', 2, 'Chapinero'),
  (1003, 'Sofia', 'Lopez', 'sofia.lopez@udistrital.edu.co', '3111111113', 11, 'Macarena'),
  (1004, 'Diego', 'Rodriguez', 'diego.rodriguez@udistrital.edu.co', '3111111114', 3, 'Chapinero'),
  (1005, 'Valentina', 'Hernandez', 'valentina.hernandez@udistrital.edu.co', '3111111115', 12, 'Macarena'),
  (1006, 'Camila', 'Perez', 'camila.perez@udistrital.edu.co', '3111111116', 4, 'Chapinero'),
  (1007, 'Juan', 'Gomez', 'juan.gomez@udistrital.edu.co', '3111111117', 22, 'Bosa'),
  (1008, 'Mariana', 'Diaz', 'mariana.diaz@udistrital.edu.co', '3111111118', 23, 'Bosa'),
  (1009, 'Sebastian', 'Morales', 'sebastian.morales@udistrital.edu.co', '3111111119', 5, 'Chapinero'),
  (1010, 'Natalia', 'Romero', 'natalia.romero@udistrital.edu.co', '3111111120', 13, 'Macarena');

-- =================================================
-- 3. INSERTS PARA LA TABLA curso
-- (cod_curso, cod_pregrado, nombre, capacidad_estudiantes, sede)
-- Cada curso se vincula al programa (pregrado) correspondiente.
-- =================================================
INSERT INTO curso (cod_curso, cod_pregrado, nombre, capacidad_estudiantes, sede)
VALUES
  (101, 1,  'Sistemas Avanzados',    30, 'Chapinero'),
  (102, 2,  'Procesos Industriales', 25, 'Chapinero'),
  (103, 11, 'Biología General',       40, 'Macarena'),
  (104, 3,  'Circuitos Digitales',    35, 'Chapinero'),
  (105, 12, 'Física Teórica',         30, 'Macarena'),
  (106, 4,  'Dinámica de Máquinas',   30, 'Chapinero'),
  (107, 22, 'Gestión Ambiental',      25, 'Bosa'),
  (108, 5,  'Mecánica de Materiales', 40, 'Chapinero'),
  (109, 13, 'Cálculo Diferencial',    35, 'Macarena'),
  (110, 14, 'Química Orgánica',       30, 'Macarena');

-- =================================================
-- 4. INSERTS PARA LA TABLA grupo
-- (cod_grupo, cod_curso, nombre, semestre)
-- Cada grupo se asocia a un curso ya insertado.
-- =================================================
INSERT INTO grupo (cod_grupo, cod_curso, nombre, semestre)
VALUES
  (201, 101, 'Grupo A - Ing. de Sistemas', 1),
  (202, 102, 'Grupo A - Ing. Industrial', 1),
  (203, 103, 'Grupo A - Lic. en Biología', 2),
  (204, 104, 'Grupo A - Ing. Electrónica', 2),
  (205, 105, 'Grupo A - Lic. en Física', 1),
  (206, 106, 'Grupo A - Ing. Mecánica', 1),
  (207, 107, 'Grupo A - Ing. Ambiental', 2),
  (208, 108, 'Grupo A - Ing. Civil', 2),
  (209, 109, 'Grupo A - Lic. en Matemáticas', 1),
  (210, 110, 'Grupo A - Lic. en Química', 1);

-- =================================================
-- 5. INSERTS PARA LA TABLA estudiante_grupo
-- (numero_documento, cod_grupo)
-- Se asigna a cada estudiante un grupo.
-- =================================================
INSERT INTO estudiante_grupo (numero_documento, cod_grupo)
VALUES
  (1001, 201),
  (1002, 202),
  (1003, 203),
  (1004, 204),
  (1005, 205),
  (1006, 206),
  (1007, 207),
  (1008, 208),
  (1009, 209),
  (1010, 210);

-- =================================================
-- 6. INSERTS PARA LA TABLA asignatura
-- (cod_asignatura, nombre_asignatura, cod_pregrado, cod_curso, horas_semanales, sede)
-- Cada asignatura se relaciona con el programa y curso correspondiente.
-- =================================================
INSERT INTO asignatura (cod_asignatura, nombre_asignatura, cod_pregrado, cod_curso, horas_semanales, sede)
VALUES
  (301, 'Algoritmos',                 1,  101, 4, 'Chapinero'),
  (302, 'Estructuras de Datos',       2,  102, 3, 'Chapinero'),
  (303, 'Biología Celular',           11, 103, 4, 'Macarena'),
  (304, 'Electrónica Digital',        3,  104, 3, 'Chapinero'),
  (305, 'Física Moderna',             12, 105, 4, 'Macarena'),
  (306, 'Mecánica de Fluidos',        4,  106, 3, 'Chapinero'),
  (307, 'Gestión de Residuos',        22, 107, 4, 'Bosa'),
  (308, 'Diseño Estructural',         5,  108, 3, 'Chapinero'),
  (309, 'Álgebra Lineal',             13, 109, 4, 'Macarena'),
  (310, 'Química Analítica',          14, 110, 3, 'Macarena');

-- =================================================
-- 7. INSERTS PARA LA TABLA profesor
-- (numero_documento, nombre, direccion, categoria, telefono, e_mail, sede)
-- Se crean 10 profesores distribuidos en las tres sedes.
-- =================================================
INSERT INTO profesor (numero_documento, nombre, direccion, categoria, telefono, e_mail, sede)
VALUES
  (2001, 'Carlos Perez',    'Calle 1 #1-1',  'Titular',   '3110000001', 'carlos.perez@udistrital.edu.co',    'Chapinero'),
  (2002, 'Ana Garcia',      'Calle 2 #2-2',  'Asociado',  '3110000002', 'ana.garcia@udistrital.edu.co',      'Chapinero'),
  (2003, 'Luis Martinez',   'Calle 3 #3-3',  'Titular',   '3110000003', 'luis.martinez@udistrital.edu.co',   'Chapinero'),
  (2004, 'Maria Rodriguez', 'Calle 4 #4-4',  'Asociado',  '3110000004', 'maria.rodriguez@udistrital.edu.co', 'Macarena'),
  (2005, 'Jorge Lopez',     'Calle 5 #5-5',  'Asistente', '3110000005', 'jorge.lopez@udistrital.edu.co',     'Macarena'),
  (2006, 'Elena Hernandez', 'Calle 6 #6-6',  'Titular',   '3110000006', 'elena.hernandez@udistrital.edu.co', 'Macarena'),
  (2007, 'Pedro Diaz',      'Calle 7 #7-7',  'Asociado',  '3110000007', 'pedro.diaz@udistrital.edu.co',      'Bosa'),
  (2008, 'Sofia Morales',   'Calle 8 #8-8',  'Titular',   '3110000008', 'sofia.morales@udistrital.edu.co',   'Bosa'),
  (2009, 'Andres Romero',   'Calle 9 #9-9',  'Asistente', '3110000009', 'andres.romero@udistrital.edu.co',   'Bosa'),
  (2010, 'Carolina Ruiz',   'Calle 10 #10-10','Titular',   '3110000010', 'carolina.ruiz@udistrital.edu.co',   'Chapinero');

-- =================================================
-- 8. INSERTS PARA LA TABLA clasificacion
-- (categoria, numero_maximo_horas, sueldo)
-- Se definen 10 categorías salariales.
-- =================================================
INSERT INTO clasificacion (categoria, numero_maximo_horas, sueldo)
VALUES
  ('Titular',       20, 5000.00),
  ('Asociado',      18, 4000.00),
  ('Asistente',     15, 3500.00),
  ('Instructor',    12, 3000.00),
  ('Adjunto',       10, 2800.00),
  ('Coordinador',   22, 5500.00),
  ('Semillero',      8, 2000.00),
  ('Auxiliar',      10, 2500.00),
  ('Investigador',  16, 4500.00),
  ('Consultor',     14, 3800.00);

-- =================================================
-- 9. INSERTS PARA LA TABLA dictar
-- (cod_asignatura, cod_profesor, n_horas, sede)
-- Se asocia cada asignatura con un profesor, según la sede.
-- =================================================
INSERT INTO dictar (cod_asignatura, cod_profesor, n_horas, sede)
VALUES
  (301, 2001, 4, 'Chapinero'),
  (302, 2002, 3, 'Chapinero'),
  (303, 2003, 4, 'Chapinero'),
  (304, 2004, 3, 'Macarena'),
  (305, 2005, 4, 'Macarena'),
  (306, 2006, 3, 'Macarena'),
  (307, 2007, 4, 'Bosa'),
  (308, 2008, 3, 'Bosa'),
  (309, 2009, 4, 'Bosa'),
  (310, 2010, 3, 'Chapinero');

-- =================================================
-- 10. INSERTS PARA LA TABLA nomina
-- (numero_documento, categoria, salario)
-- Se crea una nómina para cada profesor (centralizada en Chapinero).
-- =================================================
INSERT INTO nomina (numero_documento, categoria, salario)
VALUES
  (2001, 'Titular',    5000.00),
  (2002, 'Asociado',   4000.00),
  (2003, 'Titular',    5000.00),
  (2004, 'Asociado',   4000.00),
  (2005, 'Asistente',  3500.00),
  (2006, 'Titular',    5000.00),
  (2007, 'Asociado',   4000.00),
  (2008, 'Titular',    5000.00),
  (2009, 'Asistente',  3500.00),
  (2010, 'Titular',    5000.00);

-- ================================================
-- Fin del archivo inserts_completo_udistrital.sql
-- ================================================
