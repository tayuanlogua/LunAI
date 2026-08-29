require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { conectarBaseDatos } = require("./config/database");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend de LunAI funcionando");
});

app.get("/api/health", (req, res) => {
  res.json({
    servidor: "funcionando",
    baseDatos: "LunAI"
  });
});

const PORT = process.env.PORT || 5000;

const iniciarServidor = async () => {
  try {
    await conectarBaseDatos();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch {
    console.error("El servidor no pudo iniciar");
    process.exit(1);
  }
};

iniciarServidor();