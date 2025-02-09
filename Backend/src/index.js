import express from "express";
import cors from "cors";
import pregradoRutas from "../src/routes/pregrado.routes.js";
import estudiantesRutas from "../src/routes/estudiantes.routes.js";
import asignaturasRutas from "./routes/asignaturas.routes.js";
import clasificacionRutas from "./routes/clasificacion.routes.js";
import profesorRutas from "./routes/profesores.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

// Ruta para obtener todos los usuarios
// Usar las rutas del pregrado
app.use(pregradoRutas);
app.use(estudiantesRutas);
app.use(asignaturasRutas);
app.use(clasificacionRutas);
app.use(profesorRutas);

app.listen(3000, () => {
  console.log("Servidor en puerto: 3000 🚀");
});
