const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const productosRoutes = require("./routes/productos.routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Dashboard Rosamia funcionando",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    return res.status(200).json({
      success: true,
      message: "Servidor y base de datos funcionando correctamente",
    });
  } catch (error) {
    console.error("Error en /api/health:", error);
    return res.status(500).json({
      success: false,
      message: "Error de conexión con la base de datos",
      error: error.message,
    });
  }
});

app.use("/api/productos", productosRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

app.listen(PORT, () => {
  console.log("======================================");
  console.log(`Servidor backend: http://localhost:${PORT}`);
  console.log(`Health check:      http://localhost:${PORT}/api/health`);
  console.log(`API productos:     http://localhost:${PORT}/api/productos`);
  console.log("======================================");
});
