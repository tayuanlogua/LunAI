import type { ResultadoClinico } from "./interfaces";


export function calcularHipertiroidismo(form: any): ResultadoClinico {

    let puntos = 0;

    const factores: string[] = [];

    const recomendaciones: string[] = [];

    const estudios: string[] = [];


    //----------------------------------------
    // Pérdida de peso involuntaria
    //----------------------------------------

    if (form.perdidaPeso === "Sí") {

        puntos += 15;

        factores.push(
            "Pérdida de peso sin cambios en alimentación."
        );

    }


    //----------------------------------------
    // Aumento de apetito
    //----------------------------------------

    if (form.aumentoApetito === "Sí") {

        puntos += 8;

        factores.push(
            "Aumento del apetito."
        );

    }


    //----------------------------------------
    // Palpitaciones
    //----------------------------------------

    if (form.palpitaciones === "Sí") {

        puntos += 15;

        factores.push(
            "Palpitaciones o sensación de latidos acelerados."
        );

    }


    //----------------------------------------
    // Frecuencia cardiaca elevada
    //----------------------------------------

    if (form.latidosRapidos === "Sí") {

        puntos += 10;

        factores.push(
            "Sensación de frecuencia cardíaca elevada."
        );

    }


    //----------------------------------------
    // Intolerancia al calor
    //----------------------------------------

    if (form.sensibilidadCalor === "Sí") {

        puntos += 10;

        factores.push(
            "Intolerancia al calor."
        );

    }


    //----------------------------------------
    // Sudoración excesiva
    //----------------------------------------

    if (form.sudoracion === "Sí") {

        puntos += 8;

        factores.push(
            "Sudoración excesiva."
        );

    }


    //----------------------------------------
    // Temblor de manos
    //----------------------------------------

    if (form.temblorManos === "Sí") {

        puntos += 10;

        factores.push(
            "Temblor en manos."
        );

    }


    //----------------------------------------
    // Ansiedad / irritabilidad
    //----------------------------------------

    if (form.ansiedad === "Sí") {

        puntos += 10;

        factores.push(
            "Ansiedad, nerviosismo o irritabilidad."
        );

    }


    //----------------------------------------
    // Cambios de humor
    //----------------------------------------

    if (form.cambiosAnimo === "Sí") {

        puntos += 5;

        factores.push(
            "Cambios frecuentes de ánimo."
        );

    }


    //----------------------------------------
    // Insomnio
    //----------------------------------------

    if (form.insomnio === "Sí") {

        puntos += 8;

        factores.push(
            "Dificultad para dormir."
        );

    }


    //----------------------------------------
    // Fatiga
    //----------------------------------------

    if (form.fatiga === "Sí") {

        puntos += 8;

        factores.push(
            "Fatiga o cansancio persistente."
        );

    }


    //----------------------------------------
    // Debilidad muscular
    //----------------------------------------

    if (form.debilidadMuscular === "Sí") {

        puntos += 10;

        factores.push(
            "Debilidad muscular."
        );

    }


    //----------------------------------------
    // Evacuaciones frecuentes
    //----------------------------------------

    if (form.diarrea === "Sí") {

        puntos += 8;

        factores.push(
            "Evacuaciones frecuentes o diarrea."
        );

    }


    //----------------------------------------
    // Alteraciones ciclo menstrual
    //----------------------------------------

    if (form.menstruacionIrregular === "Sí") {

        puntos += 15;

        factores.push(
            "Alteraciones del ciclo menstrual."
        );

    }


    //----------------------------------------
    // Sangrado menstrual reducido
    //----------------------------------------

    if (form.sangradoEscaso === "Sí") {

        puntos += 8;

        factores.push(
            "Disminución del sangrado menstrual."
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
    // Ojos saltones / molestias oculares
    //----------------------------------------

    if (form.problemasOculares === "Sí") {

        puntos += 15;

        factores.push(
            "Alteraciones oculares compatibles con enfermedad tiroidea."
        );

    }


    //----------------------------------------
    // Cuello aumentado / bocio
    //----------------------------------------

    if (form.bocio === "Sí") {

        puntos += 15;

        factores.push(
            "Aumento de volumen en cuello o presencia de bocio."
        );

    }


    //----------------------------------------
    // Antecedentes familiares
    //----------------------------------------

    if (form.antecedentesTiroides === "Sí") {

        puntos += 20;

        factores.push(
            "Antecedentes familiares de enfermedad tiroidea."
        );

    }


    //----------------------------------------
    // Enfermedad autoinmune
    //----------------------------------------

    if (form.enfermedadAutoinmune === "Sí") {

        puntos += 15;

        factores.push(
            "Antecedente de enfermedad autoinmune."
        );

    }



    //----------------------------------------
    // Máximo de puntos
    //----------------------------------------

    const puntuacionMaxima = 220;



    //----------------------------------------
    // Porcentaje
    //----------------------------------------

    const porcentaje = Math.round(
        (puntos / puntuacionMaxima) * 100
    );



    //----------------------------------------
    // Determinar gravedad
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
        "Registrar cambios de peso, frecuencia cardíaca y síntomas diarios."
    );


    recomendaciones.push(
        "Mantener una alimentación equilibrada y adecuada en nutrientes."
    );


    recomendaciones.push(
        "Evitar exceso de cafeína si aumenta las palpitaciones o ansiedad."
    );


    recomendaciones.push(
        "Mantener hidratación adecuada."
    );


    if (gravedad === "Moderado") {

        recomendaciones.push(
            "Solicitar valoración médica para realizar estudios tiroideos."
        );

    }


    if (gravedad === "Alto") {

        recomendaciones.push(
            "Consultar con endocrinología para confirmar o descartar hipertiroidismo."
        );

    }


    if (gravedad === "Muy Alto") {

        recomendaciones.push(
            "Buscar atención médica prioritaria, especialmente si existen palpitaciones intensas."
        );

    }



    //----------------------------------------
    // Estudios sugeridos
    //----------------------------------------

    estudios.push(
        "TSH (Hormona estimulante de tiroides)."
    );


    estudios.push(
        "T4 libre."
    );


    estudios.push(
        "T3 libre."
    );


    estudios.push(
        "Anticuerpos TRAb para enfermedad de Graves."
    );


    estudios.push(
        "Anticuerpos anti-TPO."
    );


    estudios.push(
        "Ultrasonido tiroideo según valoración médica."
    );


    //----------------------------------------
    // Descripción automática
    //----------------------------------------

    let descripcion = "";


    switch(gravedad){


        case "Normal":

            descripcion =
            "Los síntomas registrados presentan baja compatibilidad con Hipertiroidismo. Se recomienda continuar monitoreando cambios hormonales.";

        break;


        case "Precaución":

            descripcion =
            "Se identifican algunos síntomas asociados a una posible alteración tiroidea. Se recomienda seguimiento de síntomas.";

        break;


        case "Moderado":

            descripcion =
            "Existe una combinación de síntomas compatibles con Hipertiroidismo. Se recomienda valoración médica y estudios hormonales.";

        break;


        case "Alto":

            descripcion =
            "Los síntomas registrados muestran una compatibilidad importante con Hipertiroidismo. Se recomienda valoración por endocrinología.";

        break;


        case "Muy Alto":

            descripcion =
            "El patrón de síntomas presenta alta compatibilidad con Hipertiroidismo. Este resultado no confirma diagnóstico, pero requiere valoración médica prioritaria.";

        break;

    }



    return {

        enfermedad: "Hipertiroidismo",

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
            "Endocrinólogo",

        estudiosSugeridos:
            estudios,

        descripcion

    };

}