import type { ResultadoClinico } from "./interfaces";


export function calcularHipotiroidismo(form: any): ResultadoClinico {

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
            "Fatiga o cansancio persistente."
        );

    }


    //----------------------------------------
    // Somnolencia
    //----------------------------------------

    if (form.somnolencia === "Sí") {

        puntos += 8;

        factores.push(
            "Somnolencia excesiva."
        );

    }


    //----------------------------------------
    // Aumento de peso
    //----------------------------------------

    if (form.aumentoPeso === "Sí") {

        puntos += 15;

        factores.push(
            "Aumento de peso sin cambios importantes en alimentación."
        );

    }


    //----------------------------------------
    // Dificultad para bajar peso
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
            "Sensibilidad o intolerancia al frío."
        );

    }


    //----------------------------------------
    // Piel seca
    //----------------------------------------

    if (form.pielSeca === "Sí") {

        puntos += 8;

        factores.push(
            "Piel seca o áspera."
        );

    }


    //----------------------------------------
    // Caída de cabello
    //----------------------------------------

    if (form.caidaCabello === "Sí") {

        puntos += 10;

        factores.push(
            "Caída o debilitamiento del cabello."
        );

    }


    //----------------------------------------
    // Uñas frágiles
    //----------------------------------------

    if (form.unasFragiles === "Sí") {

        puntos += 5;

        factores.push(
            "Uñas quebradizas."
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
    // Hinchazón
    //----------------------------------------

    if (form.hinchazon === "Sí") {

        puntos += 8;

        factores.push(
            "Retención de líquidos o hinchazón."
        );

    }


    //----------------------------------------
    // Cambios de ánimo
    //----------------------------------------

    if (form.cambiosAnimo === "Sí") {

        puntos += 8;

        factores.push(
            "Cambios emocionales, tristeza o irritabilidad."
        );

    }


    //----------------------------------------
    // Problemas concentración
    //----------------------------------------

    if (form.problemasMemoria === "Sí") {

        puntos += 8;

        factores.push(
            "Dificultad para concentrarse o problemas de memoria."
        );

    }


    //----------------------------------------
    // Dolor muscular
    //----------------------------------------

    if (form.dolorMuscular === "Sí") {

        puntos += 8;

        factores.push(
            "Dolor o debilidad muscular."
        );

    }


    //----------------------------------------
    // Frecuencia cardiaca baja
    //----------------------------------------

    if (form.latidosLentos === "Sí") {

        puntos += 8;

        factores.push(
            "Sensación de ritmo cardíaco lento."
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
    // Infertilidad / dificultad embarazo
    //----------------------------------------

    if (form.dificultadEmbarazo === "Sí") {

        puntos += 15;

        factores.push(
            "Dificultad para lograr embarazo."
        );

    }


    //----------------------------------------
    // Antecedente familiar tiroides
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
    // Calcular porcentaje
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
        "Registrar síntomas físicos, emocionales y cambios del ciclo menstrual."
    );


    recomendaciones.push(
        "Mantener una alimentación equilibrada con suficiente proteína, hierro, zinc y selenio."
    );


    recomendaciones.push(
        "Evitar automedicarse con suplementos de hormona tiroidea."
    );


    recomendaciones.push(
        "Realizar actividad física adaptada a los niveles de energía."
    );


    if (gravedad === "Moderado") {

        recomendaciones.push(
            "Solicitar valoración médica para descartar alteraciones tiroideas."
        );

    }


    if (gravedad === "Alto") {

        recomendaciones.push(
            "Consultar con endocrinología para evaluación hormonal."
        );

    }


    if (gravedad === "Muy Alto") {

        recomendaciones.push(
            "Buscar valoración prioritaria con endocrinólogo."
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
        "T3 libre según criterio médico."
    );


    estudios.push(
        "Anticuerpos anti-TPO y anti-tiroglobulina."
    );


    estudios.push(
        "Perfil metabólico y evaluación nutricional."
    );



    //----------------------------------------
    // Descripción automática
    //----------------------------------------

    let descripcion = "";


    switch(gravedad){


        case "Normal":

            descripcion =
            "Los síntomas registrados muestran baja compatibilidad con Hipotiroidismo. Se recomienda continuar con seguimiento de salud hormonal.";

        break;


        case "Precaución":

            descripcion =
            "Se identifican algunos síntomas relacionados con alteraciones tiroideas. Se recomienda observar la evolución y registrar cambios.";

        break;


        case "Moderado":

            descripcion =
            "Existe una combinación de síntomas compatibles con Hipotiroidismo. Se recomienda realizar estudios hormonales y valoración médica.";

        break;


        case "Alto":

            descripcion =
            "Los síntomas registrados presentan una compatibilidad importante con Hipotiroidismo. Se recomienda valoración por endocrinología.";

        break;


        case "Muy Alto":

            descripcion =
            "El patrón de síntomas presenta alta compatibilidad con Hipotiroidismo. Este resultado no confirma diagnóstico, pero requiere valoración médica prioritaria.";

        break;

    }



    return {

        enfermedad: "Hipotiroidismo",

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