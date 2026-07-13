const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend de LunAI funcionando");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});