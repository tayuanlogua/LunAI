const { sql, pool } = require("../config/database");

const registrarSintomas = async (req, res) => {
  try {
    const {
      fecha,
      dolor,
      acne,
      cansancio,
      dolor_cabeza,
      hinchazon,
      estado_emocional
    } = req.body;

    if (!fecha) {
      return res.status(400).json({
        message: "La fecha es obligatoria"
      });
    }

    if (
      dolor !== undefined &&
      (!Number.isInteger(dolor) || dolor < 0 || dolor > 10)
    ) {
      return res.status(400).json({
        message: "El dolor debe ser un número entero entre 0 y 10"
      });
    }

    const camposBooleanos = {
      acne,
      cansancio,
      dolor_cabeza,
      hinchazon
    };

    for (const [campo, valor] of Object.entries(camposBooleanos)) {
      if (valor !== undefined && typeof valor !== "boolean") {
        return res.status(400).json({
          message: `${campo} debe ser verdadero o falso`
        });
      }
    }

    const resultado = await pool
      .request()
      .input("id_usuario", sql.Int, req.usuario.id_usuario)
      .input("fecha", sql.Date, fecha)
      .input("dolor", sql.Int, dolor ?? null)
      .input("acne", sql.Bit, acne ?? null)
      .input("cansancio", sql.Bit, cansancio ?? null)
      .input("dolor_cabeza", sql.Bit, dolor_cabeza ?? null)
      .input("hinchazon", sql.Bit, hinchazon ?? null)
      .input(
        "estado_emocional",
        sql.VarChar(50),
        estado_emocional?.trim() || null
      )
      .query(`
        INSERT INTO sintomas (
          id_usuario,
          fecha,
          dolor,
          acne,
          cansancio,
          dolor_cabeza,
          hinchazon,
          estado_emocional
        )
        OUTPUT
          INSERTED.id_sintoma,
          INSERTED.fecha,
          INSERTED.dolor,
          INSERTED.acne,
          INSERTED.cansancio,
          INSERTED.dolor_cabeza,
          INSERTED.hinchazon,
          INSERTED.estado_emocional
        VALUES (
          @id_usuario,
          @fecha,
          @dolor,
          @acne,
          @cansancio,
          @dolor_cabeza,
          @hinchazon,
          @estado_emocional
        )
      `);

    return res.status(201).json({
      message: "Síntomas registrados correctamente",
      sintomas: resultado.recordset[0]
    });
  } catch (error) {
    console.error("Error registrando síntomas:", error);

    return res.status(500).json({
      message: "No fue posible registrar los síntomas"
    });
  }
};

const listarSintomas = async (req, res) => {
  try {
    const resultado = await pool
      .request()
      .input("id_usuario", sql.Int, req.usuario.id_usuario)
      .query(`
        SELECT
          id_sintoma,
          fecha,
          dolor,
          acne,
          cansancio,
          dolor_cabeza,
          hinchazon,
          estado_emocional
        FROM sintomas
        WHERE id_usuario = @id_usuario
        ORDER BY fecha DESC, id_sintoma DESC
      `);

    return res.json({
      sintomas: resultado.recordset
    });
  } catch (error) {
    console.error("Error consultando síntomas:", error);

    return res.status(500).json({
      message: "No fue posible consultar los síntomas"
    });
  }
};

module.exports = {
  registrarSintomas,
  listarSintomas
};