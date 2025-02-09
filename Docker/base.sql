docker exec -it crdb-chapinero /bin/bash


cockroach sql --insecure --host=localhost:26257


-- 1️⃣ CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE universidad;
USE universidad;

ALTER DATABASE universidad SET PRIMARY REGION "chapinero";
ALTER DATABASE universidad ADD REGION "macarena";
ALTER DATABASE universidad ADD REGION "bosa";

-- 2️⃣ TABLA PREGRADO (Distribución por sede)
CREATE TABLE pregrado (
    cod_pregrado INT PRIMARY KEY,
    nombre STRING NOT NULL,
    creditos INT NOT NULL,
    nota_minima DECIMAL(3,2) NOT NULL,
    sede STRING NOT NULL CHECK (sede IN ('Chapinero', 'Macarena', 'Bosa')),
    region crdb_internal_region AS (
        CASE sede
            WHEN 'Chapinero' THEN 'chapinero'::crdb_internal_region
            WHEN 'Macarena' THEN 'macarena'::crdb_internal_region
            WHEN 'Bosa' THEN 'bosa'::crdb_internal_region
        END
    ) STORED
) LOCALITY REGIONAL BY ROW AS region;

-- 3️⃣ TABLA CURSO (Vinculado a la sede del pregrado)
CREATE TABLE curso (
    cod_curso INT PRIMARY KEY,
    cod_pregrado INT NOT NULL REFERENCES pregrado (cod_pregrado),
    capacidad_estudiantes INT NOT NULL,
    sede STRING NOT NULL CHECK (sede IN ('Chapinero', 'Macarena', 'Bosa')),
    region crdb_internal_region AS (
        CASE sede
            WHEN 'Chapinero' THEN 'chapinero'::crdb_internal_region
            WHEN 'Macarena' THEN 'macarena'::crdb_internal_region
            WHEN 'Bosa' THEN 'bosa'::crdb_internal_region
        END
    ) STORED
) LOCALITY REGIONAL BY ROW AS region;

-- 4️⃣ TABLA GRUPO (Asociado a un curso)
CREATE TABLE grupo (
    cod_grupo INT PRIMARY KEY,
    cod_curso INT NOT NULL REFERENCES curso (cod_curso),
    nombre STRING NOT NULL,
    semestre INT NOT NULL
) LOCALITY REGIONAL BY ROW;

-- 5️⃣ TABLA ASIGNATURA (Ligada a una sede y a un curso)
CREATE TABLE asignatura (
    cod_asignatura INT PRIMARY KEY,
    nombre_asignatura STRING NOT NULL,
    cod_pregrado INT NOT NULL REFERENCES pregrado (cod_pregrado),
    cod_curso INT NOT NULL REFERENCES curso (cod_curso),
    horas_semanales INT NOT NULL,
    sede STRING NOT NULL CHECK (sede IN ('Chapinero', 'Macarena', 'Bosa')),
    region crdb_internal_region AS (
        CASE sede
            WHEN 'Chapinero' THEN 'chapinero'::crdb_internal_region
            WHEN 'Macarena' THEN 'macarena'::crdb_internal_region
            WHEN 'Bosa' THEN 'bosa'::crdb_internal_region
        END
    ) STORED
) LOCALITY REGIONAL BY ROW AS region;

-- 6️⃣ TABLA PROFESOR (Distribuido por sede)
CREATE TABLE profesor (
    numero_documento INT PRIMARY KEY,
    nombre STRING NOT NULL,
    direccion STRING NOT NULL,
    categoria STRING NOT NULL,
    telefono STRING NOT NULL,
    e_mail STRING NOT NULL UNIQUE,
    sede STRING NOT NULL CHECK (sede IN ('Chapinero', 'Macarena', 'Bosa')),
    region crdb_internal_region AS (
        CASE sede
            WHEN 'Chapinero' THEN 'chapinero'::crdb_internal_region
            WHEN 'Macarena' THEN 'macarena'::crdb_internal_region
            WHEN 'Bosa' THEN 'bosa'::crdb_internal_region
        END
    ) STORED
) LOCALITY REGIONAL BY ROW AS region;

-- 7️⃣ TABLA CLASIFICACIÓN (Centralizada en Chapinero)
CREATE TABLE clasificacion (
    categoria STRING PRIMARY KEY,
    numero_maximo_horas INT NOT NULL,
    sueldo DECIMAL(10,2) NOT NULL
) LOCALITY GLOBAL;

-- 8️⃣ TABLA DICTAR (Profesor imparte una asignatura en su sede)
CREATE TABLE dictar (
    cod_asignatura INT NOT NULL REFERENCES asignatura (cod_asignatura),
    cod_profesor INT NOT NULL REFERENCES profesor (numero_documento),
    n_horas INT NOT NULL,
    sede STRING NOT NULL CHECK (sede IN ('Chapinero', 'Macarena', 'Bosa')),
    PRIMARY KEY (cod_asignatura, cod_profesor),
    region crdb_internal_region AS (
        CASE sede
            WHEN 'Chapinero' THEN 'chapinero'::crdb_internal_region
            WHEN 'Macarena' THEN 'macarena'::crdb_internal_region
            WHEN 'Bosa' THEN 'bosa'::crdb_internal_region
        END
    ) STORED
) LOCALITY REGIONAL BY ROW AS region;

-- 9️⃣ TABLA NÓMINA (Centralizada en Chapinero)
CREATE TABLE nomina (
    numero_documento INT PRIMARY KEY REFERENCES profesor (numero_documento),
    categoria STRING NOT NULL REFERENCES clasificacion (categoria),
    salario DECIMAL(10,2) NOT NULL
) LOCALITY REGIONAL IN "chapinero";

-- 🔟 INSERTS DE PRUEBA
INSERT INTO pregrado (cod_pregrado, nombre, creditos, nota_minima, sede) VALUES
    (100, 'Ingeniería de Sistemas', 160, 3.5, 'Chapinero'),
    (101, 'Ingeniería Electrónica', 155, 3.5, 'Chapinero'),
    (102, 'Licenciatura en Matemáticas', 150, 3.2, 'Macarena'),
    (103, 'Licenciatura en Biología', 152, 3.2, 'Macarena'),
    (104, 'Tecnología en Desarrollo de Software', 120, 3.0, 'Bosa'),
    (105, 'Tecnología en Electrónica', 125, 3.0, 'Bosa');

INSERT INTO profesor (numero_documento, nombre, direccion, categoria, telefono, e_mail, sede) VALUES
    (9001, 'Carlos Pérez', 'Calle 123', 'Titular', '3214567890', 'carlos@udistrital.edu.co', 'Chapinero'),
    (9002, 'Ana Gómez', 'Carrera 45', 'Asociado', '3117894560', 'ana@udistrital.edu.co', 'Macarena'),
    (9003, 'Luis Herrera', 'Av. Siempre Viva', 'Asistente', '3001237890', 'luis@udistrital.edu.co', 'Bosa');

INSERT INTO nomina (numero_documento, categoria, salario) VALUES
    (9001, 'Titular', 5000000),
    (9002, 'Asociado', 4000000),
    (9003, 'Asistente', 3500000);

INSERT INTO clasificacion (categoria, numero_maximo_horas, sueldo) VALUES
    ('Titular', 40, 5000000),
    ('Asociado', 35, 4000000),
    ('Asistente', 30, 3500000);


INSERT INTO curso (cod_curso, cod_pregrado, capacidad_estudiantes, sede) VALUES
    (200, 100, 40, 'Chapinero'),  -- Ingeniería de Sistemas
    (201, 101, 35, 'Chapinero'),  -- Ingeniería Electrónica
    (202, 102, 30, 'Macarena'),   -- Licenciatura en Matemáticas
    (203, 103, 25, 'Macarena'),   -- Licenciatura en Biología
    (204, 104, 50, 'Bosa'),       -- Tecnología en Desarrollo de Software
    (205, 105, 45, 'Bosa');       -- Tecnología en Electrónica

INSERT INTO grupo (cod_grupo, cod_curso, nombre, semestre) VALUES
    (300, 200, 'Grupo A - Ing. Sistemas', 1),
    (301, 200, 'Grupo B - Ing. Sistemas', 2),
    (302, 201, 'Grupo A - Ing. Electrónica', 1),
    (303, 202, 'Grupo A - Lic. Matemáticas', 1),
    (304, 203, 'Grupo A - Lic. Biología', 1),
    (305, 204, 'Grupo A - Tecnología Software', 1),
    (306, 205, 'Grupo A - Tecnología Electrónica', 1);

INSERT INTO asignatura (cod_asignatura, nombre_asignatura, cod_pregrado, cod_curso, horas_semanales, sede) VALUES
    (400, 'Programación I', 100, 200, 6, 'Chapinero'),
    (401, 'Circuitos Electrónicos', 101, 201, 5, 'Chapinero'),
    (402, 'Álgebra Lineal', 102, 202, 4, 'Macarena'),
    (403, 'Genética', 103, 203, 5, 'Macarena'),
    (404, 'Bases de Datos', 104, 204, 6, 'Bosa'),
    (405, 'Redes y Comunicaciones', 105, 205, 5, 'Bosa');

INSERT INTO dictar (cod_asignatura, cod_profesor, n_horas, sede) VALUES
    (400, 9001, 8, 'Chapinero'),  -- Profesor de Chapinero
    (401, 9001, 6, 'Chapinero'),
    (402, 9002, 6, 'Macarena'),   -- Profesor de Macarena
    (403, 9002, 5, 'Macarena'),
    (404, 9003, 7, 'Bosa'),       -- Profesor de Bosa
    (405, 9003, 6, 'Bosa');
