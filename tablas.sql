-- 📌 TABLA PREGRADO (Distribución por sede)
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

-- 📌 TABLA ESTUDIANTE (Asociado a un pregrado y sede)
CREATE TABLE estudiante (
    numero_documento INT PRIMARY KEY,
    nombre STRING NOT NULL,
    apellido STRING NOT NULL,
    correo STRING NOT NULL UNIQUE,
    telefono STRING NOT NULL,
    cod_pregrado INT NOT NULL REFERENCES pregrado (cod_pregrado),
    sede STRING NOT NULL CHECK (sede IN ('Chapinero', 'Macarena', 'Bosa')),
    region crdb_internal_region AS (
        CASE sede
            WHEN 'Chapinero' THEN 'chapinero'::crdb_internal_region
            WHEN 'Macarena' THEN 'macarena'::crdb_internal_region
            WHEN 'Bosa' THEN 'bosa'::crdb_internal_region
        END
    ) STORED
) LOCALITY REGIONAL BY ROW AS region;

-- 📌 TABLA CURSO (Vinculado a la sede del pregrado)
CREATE TABLE curso (
    cod_curso INT PRIMARY KEY,
    cod_pregrado INT NOT NULL REFERENCES pregrado (cod_pregrado),
    nombre STRING NOT NULL,
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

-- 📌 TABLA GRUPO (Asociado a un curso)
CREATE TABLE grupo (
    cod_grupo INT PRIMARY KEY,
    cod_curso INT NOT NULL REFERENCES curso (cod_curso),
    nombre STRING NOT NULL,
    semestre INT NOT NULL
) LOCALITY REGIONAL BY ROW;

-- 📌 TABLA ESTUDIANTE_GRUPO (Asigna estudiantes a grupos)
CREATE TABLE estudiante_grupo (
    numero_documento INT NOT NULL REFERENCES estudiante (numero_documento),
    cod_grupo INT NOT NULL REFERENCES grupo (cod_grupo),
    PRIMARY KEY (numero_documento, cod_grupo)
) LOCALITY REGIONAL BY ROW;

-- 📌 TABLA ASIGNATURA (Ligada a una sede y a un curso)
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

-- 📌 TABLA PROFESOR (Distribuido por sede)
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

-- 📌 TABLA CLASIFICACIÓN (Centralizada en Chapinero)
CREATE TABLE clasificacion (
    categoria STRING PRIMARY KEY,
    numero_maximo_horas INT NOT NULL,
    sueldo DECIMAL(10,2) NOT NULL
) LOCALITY GLOBAL;

-- 📌 TABLA DICTAR (Profesor imparte una asignatura en su sede)
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

-- 📌 TABLA NÓMINA (Centralizada en Chapinero)
CREATE TABLE nomina (
    numero_documento INT PRIMARY KEY REFERENCES profesor (numero_documento),
    categoria STRING NOT NULL REFERENCES clasificacion (categoria),
    salario DECIMAL(10,2) NOT NULL
) LOCALITY REGIONAL IN "chapinero";
