import type { ResultadoClinico } from "./interfaces";

export function calcularEndometriosis(form: any): ResultadoClinico {

    let puntos = 0;

    const factores: string[] = [];

    const recomendaciones: string[] = [];

    const estudios: string[] = [];

    //----------------------------------------
    // Dolor incapacitante
    //----------------------------------------

    if (form.dolorIncapacitante === "Sí") {

        puntos += 30;

        factores.push(
            "Dolor menstrual incapacitante."
        );

    }

    //----------------------------------------
    // Escala del dolor
    //----------------------------------------

    const dolor = Number(form.dolorEscala);

    if (dolor >= 9) {

        puntos += 25;

        factores.push(
            "Dolor intenso (9-10/10)."
        );

    }

    else if (dolor >= 7) {

        puntos += 20;

        factores.push(
            "Dolor severo."
        );

    }

    else if (dolor >= 5) {

        puntos += 10;

        factores.push(
            "Dolor moderado."
        );

    }

    //----------------------------------------
    // Duración del dolor antes
    //----------------------------------------

    const dias = Number(
        form.dolorAntesMenstruacionDias
    );

    if (dias >= 3) {

        puntos += 10;

        factores.push(
            "Dolor inicia varios días antes del periodo."
        );

    }

    //----------------------------------------
    // Dolor ovulación
    //----------------------------------------

    if (form.dolorOvulacion === "Sí") {

        puntos += 10;

        factores.push(
            "Dolor durante la ovulación."
        );

    }

    //----------------------------------------
    // Relaciones sexuales
    //----------------------------------------

    if (form.dolorRelaciones === "Sí") {

        puntos += 20;

        factores.push(
            "Dolor durante relaciones sexuales."
        );

    }

    if (form.dolorPenetracion === "Sí") {

        puntos += 15;

        factores.push(
            "Dolor con penetración profunda."
        );

    }

    //----------------------------------------
    // Dolor intestinal
    //----------------------------------------

    if (
        form.dolorDefecar === "Sí" ||
        form.dolorDefecarMenstruacion === "Sí"
    ) {

        puntos += 20;

        factores.push(
            "Dolor al evacuar durante la menstruación."
        );

    }

    //----------------------------------------
    // Dolor urinario
    //----------------------------------------

    if (
        form.dolorOrinar === "Sí" ||
        form.dolorOrinarMenstruacion === "Sí"
    ) {

        puntos += 15;

        factores.push(
            "Dolor al orinar durante la menstruación."
        );

    }

    //----------------------------------------
    // Dolor lumbar
    //----------------------------------------

    if (form.dolorLumbar === "Sí") {

        puntos += 10;

        factores.push(
            "Dolor lumbar."
        );

    }

    //----------------------------------------
    // Dolor piernas
    //----------------------------------------

    if (form.dolorPiernas === "Sí") {

        puntos += 10;

        factores.push(
            "Dolor irradiado hacia piernas."
        );

    }

    //----------------------------------------
    // Sangrado abundante
    //----------------------------------------

    if (form.flujo === "Abundante") {

        puntos += 10;

        factores.push(
            "Flujo menstrual abundante."
        );

    }

    //----------------------------------------
    // Más de siete días
    //----------------------------------------

    if (form.sangradoMayor7Dias === "Sí") {

        puntos += 15;

        factores.push(
            "Menstruaciones mayores de siete días."
        );

    }

    //----------------------------------------
    // Coágulos
    //----------------------------------------

    if (form.coagulos === "Sí") {

        puntos += 8;

        factores.push(
            "Presencia de coágulos."
        );

    }

        //----------------------------------------
    // Manchado entre periodos
    //----------------------------------------

    if (form.manchadoEntrePeriodos === "Sí") {

        puntos += 10;

        factores.push(
            "Manchado entre periodos."
        );

    }

    //----------------------------------------
    // Sangrado después de relaciones
    //----------------------------------------

    if (form.sangradoDespuesRelaciones === "Sí") {

        puntos += 10;

        factores.push(
            "Sangrado después de relaciones sexuales."
        );

    }

    //----------------------------------------
    // Infertilidad
    //----------------------------------------

    if (form.infertilidad === "Sí") {

        puntos += 20;

        factores.push(
            "Antecedente de infertilidad."
        );

    }

    //----------------------------------------
    // Tiempo buscando embarazo
    //----------------------------------------

    const meses = Number(form.tiempoBuscandoEmbarazo);

    if (meses >= 12) {

        puntos += 15;

        factores.push(
            "Más de un año intentando embarazo."
        );

    }

    //----------------------------------------
    // Abortos recurrentes
    //----------------------------------------

    if (form.abortosRecurrentes === "Sí") {

        puntos += 10;

        factores.push(
            "Antecedente de abortos recurrentes."
        );

    }

    //----------------------------------------
    // Miomas
    //----------------------------------------

    if (form.miomas === "Sí") {

        puntos += 8;

        factores.push(
            "Antecedente de miomas uterinos."
        );

    }

    //----------------------------------------
    // Quistes ováricos
    //----------------------------------------

    if (form.quistesOvaricos === "Sí") {

        puntos += 8;

        factores.push(
            "Antecedente de quistes ováricos."
        );

    }

    //----------------------------------------
    // Cirugías pélvicas
    //----------------------------------------

    if (form.cirugiasPelvicas === "Sí") {

        puntos += 8;

        factores.push(
            "Cirugías pélvicas previas."
        );

    }

    //----------------------------------------
    // Cesáreas
    //----------------------------------------

    if (form.cesareas === "Sí") {

        puntos += 3;

        factores.push(
            "Antecedente de cesárea."
        );

    }

    //----------------------------------------
    // Antecedente familiar
    //----------------------------------------

    if (form.antecedentesEndometriosis === "Sí") {

        puntos += 25;

        factores.push(
            "Antecedentes familiares de endometriosis."
        );

    }

    //----------------------------------------
    // Uso frecuente de analgésicos
    //----------------------------------------

    if (form.usoAnalgesicos === "Sí") {

        puntos += 12;

        factores.push(
            "Uso frecuente de analgésicos por dolor menstrual."
        );

    }

    //----------------------------------------
    // Ausencias laborales
    //----------------------------------------

    if (form.ausenciasTrabajo === "Sí") {

        puntos += 15;

        factores.push(
            "Ausencias laborales o escolares por dolor."
        );

    }

    //----------------------------------------
    // Distensión abdominal
    //----------------------------------------

    if (form.distensionAbdominal === "Sí") {

        puntos += 5;

        factores.push(
            "Distensión abdominal frecuente."
        );

    }

    //----------------------------------------
    // Diarrea durante menstruación
    //----------------------------------------

    if (form.diarrea === "Sí") {

        puntos += 5;

        factores.push(
            "Diarrea durante el periodo menstrual."
        );

    }

    //----------------------------------------
    // Estreñimiento
    //----------------------------------------

    if (form.estreñimiento === "Sí") {

        puntos += 5;

        factores.push(
            "Estreñimiento asociado al ciclo."
        );

    }

    //----------------------------------------
    // Fatiga
    //----------------------------------------

    if (form.fatiga === "Sí") {

        puntos += 5;

        factores.push(
            "Fatiga persistente."
        );

    }

    //----------------------------------------
    // Ansiedad
    //----------------------------------------

    if (form.ansiedad === "Sí") {

        puntos += 3;

        factores.push(
            "Ansiedad relacionada con el dolor."
        );

    }

    //----------------------------------------
    // Máximo de puntos
    //----------------------------------------

    const puntuacionMaxima = 300;

    //----------------------------------------
    // Porcentaje
    //----------------------------------------

    const porcentaje = Math.round(
        (puntos / puntuacionMaxima) * 100
    );

    //----------------------------------------
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
    let prioridad: "Baja" | "Media" | "Alta" | "Urgente";
    let requiereEspecialista: boolean = false;
    if (porcentaje <= 20) {

        gravedad = "Normal";
        color = "#4CAF50";
        prioridad = "Baja";
        requiereEspecialista = false;

    }

    else if (porcentaje <= 40) {

        gravedad = "Precaución";
        color = "#FFD54F";
        prioridad = "Media";
        requiereEspecialista = false;
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
        "Registrar diariamente los síntomas y el dolor menstrual."
    );

    recomendaciones.push(
        "Evitar la automedicación prolongada con analgésicos."
    );

    recomendaciones.push(
        "Mantener actividad física moderada según tolerancia."
    );

    recomendaciones.push(
        "Dormir al menos 7-8 horas por noche."
    );

    recomendaciones.push(
        "Mantener una alimentación antiinflamatoria rica en frutas, verduras y omega 3."
    );

    if (gravedad === "Moderado") {

        recomendaciones.push(
            "Solicitar valoración por un ginecólogo."
        );

    }

    if (gravedad === "Alto") {

        recomendaciones.push(
            "Programar consulta con ginecología en las próximas semanas."
        );

        recomendaciones.push(
            "Llevar un calendario menstrual detallado."
        );

    }

    if (gravedad === "Muy Alto") {

        recomendaciones.push(
            "Buscar atención con un ginecólogo especialista en endometriosis lo antes posible."
        );

        recomendaciones.push(
            "No retrasar la valoración médica si el dolor limita las actividades diarias."
        );

    }

    //----------------------------------------
    // Estudios sugeridos
    //----------------------------------------

    estudios.push(
        "Exploración ginecológica completa."
    );

    estudios.push(
        "Ultrasonido pélvico transvaginal."
    );

    estudios.push(
        "Ultrasonido especializado para endometriosis profunda."
    );

    estudios.push(
        "Resonancia Magnética de pelvis (si el especialista lo considera necesario)."
    );

    estudios.push(
        "Marcador CA-125 (como apoyo, no diagnóstico)."
    );

    estudios.push(
        "Laparoscopia diagnóstica en casos seleccionados."
    );

    //----------------------------------------
    // Descripción automática
    //----------------------------------------

    let descripcion = "";

    switch (gravedad) {

        case "Normal":

            descripcion =
                "Actualmente las respuestas proporcionadas muestran un riesgo bajo de presentar un patrón compatible con Endometriosis. Se recomienda continuar con el seguimiento periódico del ciclo menstrual.";

            break;

        case "Precaución":

            descripcion =
                "Se identifican algunos síntomas compatibles con Endometriosis, aunque aún son insuficientes para considerar un riesgo elevado. Es recomendable continuar registrando los síntomas durante los siguientes ciclos.";

            break;

        case "Moderado":

            descripcion =
                "Las respuestas muestran varios hallazgos que podrían asociarse con Endometriosis. Se recomienda acudir con un ginecólogo para una valoración clínica.";

            break;

        case "Alto":

            descripcion =
                "Existe una combinación importante de síntomas relacionados con Endometriosis. Es recomendable solicitar una valoración médica especializada para confirmar o descartar esta enfermedad.";

            break;

        case "Muy Alto":

            descripcion =
                "El patrón de síntomas registrado es altamente compatible con Endometriosis. Este resultado NO representa un diagnóstico, pero sí justifica una valoración prioritaria por un ginecólogo especialista.";

            break;

    }

    //----------------------------------------
    // Regresar resultado
    //----------------------------------------

    return {
        enfermedad: "Endometriosis",
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
            "Ginecólogo especialista en Endometriosis",
        estudiosSugeridos: estudios,
        descripcion 
    }
}