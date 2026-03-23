const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const productosRoutes = require("./routes/productos.routes");
const catalogoRoutes = require("./routes/router.catalogo.routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API de Rosamia funcionando"
  });
});

app.use("/api/productos", productosRoutes);
app.use("/api/catalogo", catalogoRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
  console.log(`API Productos: http://127.0.0.1:${PORT}/api/productos`);
  console.log(`API Catalogo: http://127.0.0.1:${PORT}/api/catalogo`);
  console.log(`PDF Catalogo: http://127.0.0.1:${PORT}/uploads/rosamia7.pdf`);
});