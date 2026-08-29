const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sql, pool } = require("../config/database");

const registrarUsuario = async (req, res) => {
  try {
    const {
      nombre,
      correo,
      contrasena,
      pin,
      fecha_nacimiento
    } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({
        message: "Nombre, correo y contraseña son obligatorios"
      });
    }

    if (contrasena.length < 8) {
      return res.status(400).json({
        message: "La contraseña debe tener mínimo 8 caracteres"
      });
    }

    const correoNormalizado = correo.trim().toLowerCase();

    const usuarioExistente = await pool
      .request()
      .input("correo", sql.VarChar(100), correoNormalizado)
      .query(`
        SELECT id_usuario
        FROM usuarios
        WHERE correo = @correo
      `);

    if (usuarioExistente.recordset.length > 0) {
      return res.status(409).json({
        message: "Este correo ya está registrado"
      });
    }

    const contrasenaProtegida = await bcrypt.hash(contrasena, 12);

    const resultado = await pool
      .request()
      .input("nombre", sql.VarChar(100), nombre.trim())
      .input("correo", sql.VarChar(100), correoNormalizado)
      .input("contrasena", sql.VarChar(255), contrasenaProtegida)
      .input("pin", sql.VarChar(10), pin || null)
      .input("fecha_nacimiento", sql.Date, fecha_nacimiento || null)
      .query(`
        INSERT INTO usuarios (
          nombre,
          correo,
          contrasena,
          pin,
          fecha_nacimiento
        )
        OUTPUT
          INSERTED.id_usuario,
          INSERTED.nombre,
          INSERTED.correo,
          INSERTED.fecha_registro
        VALUES (
          @nombre,
          @correo,
          @contrasena,
          @pin,
          @fecha_nacimiento
        )
      `);

    return res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario: resultado.recordset[0]
    });
  } catch (error) {
    console.error("Error registrando usuario:", error);

    return res.status(500).json({
      message: "No fue posible registrar el usuario"
    });
  }
};

const iniciarSesion = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({
        message: "Correo y contraseña son obligatorios"
      });
    }

    const resultado = await pool
      .request()
      .input(
        "correo",
        sql.VarChar(100),
        correo.trim().toLowerCase()
      )
      .query(`
        SELECT
          id_usuario,
          nombre,
          correo,
          contrasena
        FROM usuarios
        WHERE correo = @correo
      `);

    const usuario = resultado.recordset[0];

    if (!usuario) {
      return res.status(401).json({
        message: "Correo o contraseña incorrectos"
      });
    }

    const contrasenaCorrecta = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );

    if (!contrasenaCorrecta) {
      return res.status(401).json({
        message: "Correo o contraseña incorrectos"
      });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        correo: usuario.correo
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    );

    return res.json({
      message: "Inicio de sesión correcto",
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });
  } catch (error) {
    console.error("Error iniciando sesión:", error);

    return res.status(500).json({
      message: "No fue posible iniciar sesión"
    });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion
};