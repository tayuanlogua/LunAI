const express = require("express");

const {
  registrarUsuario,
  iniciarSesion,
  obtenerPerfil
} = require("../controllers/authController");

const {
  verificarToken
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registrarUsuario);
router.post("/login", iniciarSesion);
router.get("/profile", verificarToken, obtenerPerfil);

module.exports = router;