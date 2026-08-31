const express = require("express");

const {
  crearCiclo,
  listarCiclos
} = require("../controllers/ciclosController");

const {
  verificarToken
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verificarToken, crearCiclo);
router.get("/", verificarToken, listarCiclos);

module.exports = router;