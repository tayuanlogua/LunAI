import type { ResultadoClinico } from "./interfaces";


export function calcularHashimoto(form: any): ResultadoClinico {

    let puntos = 0;

    const factores: string[] = [];

    const recomendaciones: string[] = [];

    const estudios: string[] = [];


    //----------------------------------------
    // Fatiga persistente
    //----------------------------------------

    if (form.fatiga === "Sí") {

        puntos += 15;

        factores.push(
            "Fatiga persistente o cansancio excesivo."
        );

    }


    //----------------------------------------
    // Cansancio al despertar
    //----------------------------------------

    if (form.cansancioDespertar === "Sí") {

        puntos += 8;

        factores.push(
            "Sensación de cansancio desde el inicio del día."
        );

    }


    //----------------------------------------
    // Aumento de peso
    //----------------------------------------

    if (form.aumentoPeso === "Sí") {

        puntos += 15;

        factores.push(
            "Aumento de peso sin causa aparente."
        );

    }


    //----------------------------------------
    // Dificultad bajar peso
    //----------------------------------------

    if (form.dificultadBajarPeso === "Sí") {

        puntos += 10;

        factores.push(
            "Dificultad para perder peso."
        );

    }


    //----------------------------------------
    // Intolerancia al frío
    //----------------------------------------

    if (form.sensibilidadFrio === "Sí") {

        puntos += 10;

        factores.push(
            "Sensibilidad excesiva al frío."
        );

    }


    //----------------------------------------
    // Piel seca
    //----------------------------------------

    if (form.pielSeca === "Sí") {

        puntos += 8;

        factores.push(
            "Piel seca o cambios en textura de piel."
        );

    }


    //----------------------------------------
    // Caída cabello
    //----------------------------------------

    if (form.caidaCabello === "Sí") {

        puntos += 12;

        factores.push(
            "Caída de cabello o cabello debilitado."
        );

    }


    //----------------------------------------
    // Uñas frágiles
    //----------------------------------------

    if (form.unasFragiles === "Sí") {

        puntos += 5;

        factores.push(
            "Uñas débiles o quebradizas."
        );

    }


    //----------------------------------------
    // Hinchazón
    //----------------------------------------

    if (form.hinchazon === "Sí") {

        puntos += 8;

        factores.push(
            "Retención de líquidos o hinchazón."
        );

    }


    //----------------------------------------
    // Estreñimiento
    //----------------------------------------

    if (form.estreñimiento === "Sí") {

        puntos += 10;

        factores.push(
            "Estreñimiento frecuente."
        );

    }


    //----------------------------------------
    // Problemas memoria
    //----------------------------------------

    if (form.problemasMemoria === "Sí") {

        puntos += 8;

        factores.push(
            "Dificultad de concentración o memoria."
        );

    }


    //----------------------------------------
    // Cambios emocionales
    //----------------------------------------

    if (form.cambiosAnimo === "Sí") {

        puntos += 8;

        factores.push(
            "Cambios de ánimo, tristeza o irritabilidad."
        );

    }


    //----------------------------------------
    // Dolor muscular/articular
    //----------------------------------------

    if (form.dolorMuscular === "Sí") {

        puntos += 8;

        factores.push(
            "Dolor muscular o articular."
        );

    }


    //----------------------------------------
    // Inflamación cuello / bocio
    //----------------------------------------

    if (form.inflamacionCuello === "Sí") {

        puntos += 15;

        factores.push(
            "Inflamación en cuello o aumento de tamaño de tiroides."
        );

    }


    //----------------------------------------
    // Sensación presión garganta
    //----------------------------------------

    if (form.presionGarganta === "Sí") {

        puntos += 8;

        factores.push(
            "Sensación de presión o molestia en garganta."
        );

    }


    //----------------------------------------
    // Alteraciones menstruación
    //----------------------------------------

    if (form.menstruacionIrregular === "Sí") {

        puntos += 15;

        factores.push(
            "Alteraciones del ciclo menstrual."
        );

    }


    //----------------------------------------
    // Sangrado abundante
    //----------------------------------------

    if (form.sangradoAbundante === "Sí") {

        puntos += 10;

        factores.push(
            "Sangrado menstrual abundante."
        );

    }


    //----------------------------------------
    // Dificultad embarazo
    //----------------------------------------

    if (form.dificultadEmbarazo === "Sí") {

        puntos += 15;

        factores.push(
            "Dificultad para lograr embarazo."
        );

    }


    //----------------------------------------
    // Antecedentes familiares Hashimoto/Tiroides
    //----------------------------------------

    if (form.antecedentesTiroides === "Sí") {

        puntos += 20;

        factores.push(
            "Antecedentes familiares de enfermedad tiroidea."
        );

    }


    //----------------------------------------
    // Enfermedades autoinmunes
    //----------------------------------------

    if (form.enfermedadAutoinmune === "Sí") {

        puntos += 20;

        factores.push(
            "Antecedente personal de enfermedad autoinmune."
        );

    }


    //----------------------------------------
    // Máximo puntos
    //----------------------------------------

    const puntuacionMaxima = 240;



    //----------------------------------------
    // Porcentaje
    //----------------------------------------

    const porcentaje = Math.round(
        (puntos / puntuacionMaxima) * 100
    );



    //----------------------------------------
    // Gravedad
    //----------------------------------------

    let gravedad:
        | "Normal"
        | "Precaución"
        | "Moderado"
        | "Alto"
        | "Muy Alto";


    let color = "";

    let prioridad:
        | "Baja"
        | "Media"
        | "Alta"
        | "Urgente";


    let requiereEspecialista = false;



    if (porcentaje <= 20) {

        gravedad = "Normal";
        color = "#4CAF50";
        prioridad = "Baja";

    }


    else if (porcentaje <= 40) {

        gravedad = "Precaución";
        color = "#FFD54F";
        prioridad = "Media";

    }


    else if (porcentaje <= 60) {

        gravedad = "Moderado";
        color = "#FB8C00";
        prioridad = "Alta";
        requiereEspecialista = true;

    }


    else if (porcentaje <= 80) {

        gravedad = "Alto";
        color = "#E53935";
        prioridad = "Urgente";
        requiereEspecialista = true;

    }


    else {

        gravedad = "Muy Alto";
        color = "#8E24AA";
        prioridad = "Urgente";
        requiereEspecialista = true;

    }



    //----------------------------------------
    // Recomendaciones
    //----------------------------------------

    recomendaciones.push(
        "Registrar síntomas diarios y cambios hormonales."
    );


    recomendaciones.push(
        "Mantener una alimentación equilibrada con suficiente proteína, hierro, zinc y selenio."
    );


    recomendaciones.push(
        "Evitar automedicarse con hormonas tiroideas o suplementos sin supervisión."
    );


    recomendaciones.push(
        "Realizar controles médicos periódicos si existe sospecha de alteración tiroidea."
    );


    if (gravedad === "Moderado") {

        recomendaciones.push(
            "Solicitar estudios tiroideos para evaluar función de la glándula."
        );

    }


    if (gravedad === "Alto") {

        recomendaciones.push(
            "Consultar con endocrinología para valoración de posible Hashimoto."
        );

    }


    if (gravedad === "Muy Alto") {

        recomendaciones.push(
            "Buscar valoración prioritaria por endocrinología."
        );

    }



    //----------------------------------------
    // Estudios sugeridos
    //----------------------------------------

    estudios.push(
        "TSH."
    );


    estudios.push(
        "T4 libre."
    );


    estudios.push(
        "Anticuerpos anti-TPO."
    );


    estudios.push(
        "Anticuerpos anti-tiroglobulina (Anti-Tg)."
    );


    estudios.push(
        "Ultrasonido tiroideo."
    );


    estudios.push(
        "Biometría hemática y perfil metabólico según valoración médica."
    );



    //----------------------------------------
    // Descripción
    //----------------------------------------

    let descripcion = "";


    switch(gravedad) {


        case "Normal":

            descripcion =
            "Los síntomas registrados muestran baja compatibilidad con Tiroiditis de Hashimoto. Se recomienda mantener seguimiento de salud hormonal.";

        break;


        case "Precaución":

            descripcion =
            "Se detectan algunos síntomas relacionados con alteraciones tiroideas autoinmunes. Se recomienda observar evolución y realizar seguimiento.";

        break;


        case "Moderado":

            descripcion =
            "Existe una combinación de síntomas compatible con posible Tiroiditis de Hashimoto. Se recomienda valoración médica y estudios tiroideos.";

        break;


        case "Alto":

            descripcion =
            "Los síntomas registrados presentan una compatibilidad importante con Hashimoto. Se recomienda valoración por endocrinología.";

        break;


        case "Muy Alto":

            descripcion =
            "El patrón de síntomas presenta alta compatibilidad con Tiroiditis de Hashimoto. Este resultado no confirma diagnóstico, pero requiere evaluación médica prioritaria.";

        break;

    }



    return {

        enfermedad: "Tiroiditis de Hashimoto",

        porcentaje,

        gravedad,

        prioridad,

        requiereEspecialista,

        color,

        puntuacion: puntos,

        puntuacionMaxima,

        factores,

        recomendaciones,

        especialista:
            "Endocrinólogo especialista en enfermedades tiroideas",

        estudiosSugeridos:
            estudios,

        descripcion

    };

}