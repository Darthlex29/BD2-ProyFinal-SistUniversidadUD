import pkg from "pg";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const { Pool } = pkg;

const env = process.env.NODE_ENV || "development";
const config = JSON.parse(fs.readFileSync("./src/config/config.json", "utf-8"));
const dbConfig = config[env];

const pool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  ssl: dbConfig.ssl ? { rejectUnauthorized: false } : false, // Esto permite desactivar SSL
});

const verificarConexion = async () => {
  console.log("🔄 Intentando conectar a CockroachDB desde Node.js...");
  try {
    const client = await pool.connect();
    console.log("✅ Conexión exitosa a CockroachDB.");
    client.release();
  } catch (error) {
    console.error("❌ Error al conectar:", error);
  }
};

verificarConexion();

export default pool;
