const catalogoRoutes = require("./routes/router.catalogo.routes");
import express from "express";
import cors from "cors";

import productosRoutes from "./routes/productos.routes.js";
import catalogoRoutes from "./routes/catalogo.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos PDF (catÃ¡logos)
app.use("/uploads", express.static("uploads"));

// Rutas API
app.use("/api/productos", productosRoutes);
app.use("/api/catalogo", catalogoRoutes);

export default app;
 