const { sql, pool } = require("../config/database");

const crearCiclo = async (req, res) => {
  try {
    const {
      fecha_inicio,
      fecha_fin,
      duracion_ciclo,
      duracion_periodo,
      fase_actual
    } = req.body;

    if (!fecha_inicio) {
      return res.status(400).json({
        message: "La fecha de inicio es obligatoria"
      });
    }

    if (fecha_fin && fecha_fin < fecha_inicio) {
      return res.status(400).json({
        message: "La fecha final no puede ser anterior a la fecha inicial"
      });
    }

    if (
      duracion_ciclo !== undefined &&
      (!Number.isInteger(duracion_ciclo) || duracion_ciclo <= 0)
    ) {
      return res.status(400).json({
        message: "La duración del ciclo debe ser un número entero positivo"
      });
    }

    if (
      duracion_periodo !== undefined &&
      (!Number.isInteger(duracion_periodo) || duracion_periodo <= 0)
    ) {
      return res.status(400).json({
        message: "La duración del periodo debe ser un número entero positivo"
      });
    }

    const resultado = await pool
      .request()
      .input("id_usuario", sql.Int, req.usuario.id_usuario)
      .input("fecha_inicio", sql.Date, fecha_inicio)
      .input("fecha_fin", sql.Date, fecha_fin || null)
      .input("duracion_ciclo", sql.Int, duracion_ciclo || null)
      .input("duracion_periodo", sql.Int, duracion_periodo || null)
      .input(
        "fase_actual",
        sql.VarChar(50),
        fase_actual?.trim() || null
      )
      .query(`
        INSERT INTO ciclos (
          id_usuario,
          fecha_inicio,
          fecha_fin,
          duracion_ciclo,
          duracion_periodo,
          fase_actual
        )
        OUTPUT
          INSERTED.id_ciclo,
          INSERTED.fecha_inicio,
          INSERTED.fecha_fin,
          INSERTED.duracion_ciclo,
          INSERTED.duracion_periodo,
          INSERTED.fase_actual
        VALUES (
          @id_usuario,
          @fecha_inicio,
          @fecha_fin,
          @duracion_ciclo,
          @duracion_periodo,
          @fase_actual
        )
      `);

    return res.status(201).json({
      message: "Ciclo registrado correctamente",
      ciclo: resultado.recordset[0]
    });
  } catch (error) {
    console.error("Error registrando ciclo:", error);

    return res.status(500).json({
      message: "No fue posible registrar el ciclo"
    });
  }
};

const listarCiclos = async (req, res) => {
  try {
    const resultado = await pool
      .request()
      .input("id_usuario", sql.Int, req.usuario.id_usuario)
      .query(`
        SELECT
          id_ciclo,
          fecha_inicio,
          fecha_fin,
          duracion_ciclo,
          duracion_periodo,
          fase_actual
        FROM ciclos
        WHERE id_usuario = @id_usuario
        ORDER BY fecha_inicio DESC
      `);

    return res.json({
      ciclos: resultado.recordset
    });
  } catch (error) {
    console.error("Error consultando ciclos:", error);

    return res.status(500).json({
      message: "No fue posible consultar los ciclos"
    });
  }
};

module.exports = {
  crearCiclo,
  listarCiclos
};