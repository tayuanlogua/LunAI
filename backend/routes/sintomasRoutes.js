const express = require("express");

const {
  registrarSintomas,
  listarSintomas
} = require("../controllers/sintomasController");

const {
  verificarToken
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verificarToken, registrarSintomas);
router.get("/", verificarToken, listarSintomas);

module.exports = router;