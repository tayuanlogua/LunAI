const express = require("express");

const {
  crearCiclo,
  listarCiclos,
  actualizarCiclo,
  eliminarCiclo
} = require("../controllers/ciclosController");

const {
  verificarToken
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verificarToken, crearCiclo);
router.get("/", verificarToken, listarCiclos);
router.put("/:id", verificarToken, actualizarCiclo);
router.delete("/:id", verificarToken, eliminarCiclo);

module.exports = router;