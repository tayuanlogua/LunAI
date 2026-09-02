const GEMINI_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_MESSAGES = 12;

const esperar = (milisegundos) =>
  new Promise((resolve) => setTimeout(resolve, milisegundos));

const limpiarTexto = (valor) =>
  typeof valor === "string"
    ? valor.trim().slice(0, MAX_MESSAGE_LENGTH)
    : "";

const extraerRespuesta = (respuesta) =>
  (respuesta.candidates?.[0]?.content?.parts || [])
    .map((parte) => parte.text || "")
    .join("")
    .trim();

const obtenerModelos = () =>
  [
    process.env.GEMINI_MODEL,
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-3.7-flash"
  ].filter(
    (modelo, indice, modelos) =>
      modelo && modelos.indexOf(modelo) === indice
  );

const solicitarRespuesta = async (modelo, historial) => {
  const url = `${GEMINI_BASE_URL}/${modelo}:generateContent`;

  const respuesta = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [
          {
            text: `Eres LunAI, una acompañante educativa y empática sobre bienestar y salud hormonal femenina. Responde siempre en español claro, cálido y breve. No diagnostiques, no reemplaces una consulta médica, no indiques suspender medicamentos y no inventes datos. Si falta información, dilo. Si la persona menciona dolor súbito intenso, desmayo, dificultad respiratoria, sangrado muy abundante, autolesión o peligro inmediato, recomienda buscar atención urgente local. No solicites nombres completos, documentos, direcciones ni contraseñas.`
          }
        ]
      },
      contents: historial,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.5
      }
    })
  });

  return {
    respuesta,
    datos: await respuesta.json()
  };
};

const conversarConAgente = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        message: "Falta configurar GEMINI_API_KEY"
      });
    }

    const mensaje = limpiarTexto(req.body?.message);

    if (!mensaje) {
      return res.status(400).json({
        message: "Escribe un mensaje para LunAI"
      });
    }

    const historial = Array.isArray(req.body?.history)
      ? req.body.history
          .slice(-MAX_HISTORY_MESSAGES)
          .map((item) => ({
            role: item?.role === "assistant" ? "model" : "user",
            parts: [{ text: limpiarTexto(item?.content) }]
          }))
          .filter((item) => item.parts[0].text)
      : [];

    const ultimoTexto =
      historial[historial.length - 1]?.parts?.[0]?.text;

    if (ultimoTexto !== mensaje) {
      historial.push({
        role: "user",
        parts: [{ text: mensaje }]
      });
    }

    let ultimoEstado = 503;

    for (const modelo of obtenerModelos()) {
      const { respuesta, datos } = await solicitarRespuesta(
        modelo,
        historial
      );

      ultimoEstado = respuesta.status;

      if (respuesta.ok) {
        const texto = extraerRespuesta(datos);

        if (texto) {
          console.log(`LunAI respondió con ${modelo}`);
          return res.json({ message: texto });
        }
      }

      console.error(
        `Error de Gemini con ${modelo}:`,
        respuesta.status,
        datos?.error?.message
      );

      if (![429, 503].includes(respuesta.status)) {
        return res.status(502).json({
          message: "LunAI no pudo responder en este momento"
        });
      }

      await esperar(800);
    }

    return res.status(503).json({
      message:
        ultimoEstado === 429
          ? "LunAI alcanzó temporalmente el límite gratuito. Intenta nuevamente en un momento."
          : "LunAI está muy solicitada. Intenta nuevamente en un momento."
    });
  } catch (error) {
    console.error("Error conversando con LunAI:", error);

    return res.status(500).json({
      message: "No fue posible conversar con LunAI"
    });
  }
};

module.exports = { conversarConAgente };
