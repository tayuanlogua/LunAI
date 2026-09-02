const express = require("express");
const { conversarConAgente } = require("../controllers/agentController");
const { verificarToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/chat", verificarToken, conversarConAgente);

module.exports = router;
