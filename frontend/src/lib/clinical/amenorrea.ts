import type { ResultadoClinico } from "./interfaces";

export function calcularAmenorrea(form: any): ResultadoClinico {

    let puntos = 0;
    const factores: string[] = [];
    const recomendaciones: string[] = [];
    const estudios: string[] = [];

    //----------------------------------------
    // Amenorrea actual
    //----------------------------------------

    if (form.ciclosAusentes === "Sí") {
        puntos += 40;
        factores.push(
            "Ausencia de menstruación."
        );
    }

    //----------------------------------------
    // Meses sin menstruar
    //----------------------------------------

    const meses = Number(form.ciclosAusentesMeses);
    if (meses >= 6) {
        puntos += 35;
        factores.push(
            "Más de seis meses sin menstruación."
        );
    }

    else if (meses >= 3) {
        puntos += 25;
        factores.push(
            "Tres meses o más sin menstruación."
        );
    }

    //----------------------------------------
    // Menstruaciones por año
    //----------------------------------------

    const ciclos = Number(form.menstruacionesUltimoAno);
    if (ciclos <= 4) {
        puntos += 25;
        factores.push(
            "Muy pocas menstruaciones en el último año."
        );
    }

    else if (ciclos <= 8) {
        puntos += 15;
        factores.push(
            "Menstruaciones poco frecuentes."
        );
    }

    //----------------------------------------
    // Ciclos largos
    //----------------------------------------

    const duracion = Number(form.ciclo);
    if (duracion >= 45) {
        puntos += 15;
        factores.push(
            "Ciclos mayores de 45 días."
        );
    }

    //----------------------------------------
    // Irregularidad
    //----------------------------------------

    if (form.regular === "No") {
        puntos += 10;
        factores.push(
            "Ciclos menstruales irregulares."
        );
    }

    //----------------------------------------
    // Bajo peso
    //----------------------------------------

    const peso = Number(form.peso);
    const estatura = Number(form.estatura) / 100;
    if (peso > 0 && estatura > 0) {
        const imc = peso / (estatura * estatura);
        if (imc < 18.5) {
            puntos += 20;
            factores.push(
                "Bajo peso corporal."
            );
        }
    }

    //----------------------------------------
    // Ejercicio intenso
    //----------------------------------------

    const ejercicio = Number(form.ejercicioSemana);
    if (ejercicio >= 6) {
        puntos += 12;
        factores.push(
            "Ejercicio intenso."
        );
    }

    //----------------------------------------
    // Estrés
    //----------------------------------------

    const estres = Number(form.estresEscala);
    if (estres >= 8) {
        puntos += 15;
        factores.push(
            "Estrés elevado."
        );
    }

    else if (estres >= 5) {
        puntos += 8;
        factores.push(
            "Estrés moderado."
        );
    }

    //----------------------------------------
    // Sueño
    //----------------------------------------

    const sueno = Number(form.horasSueño);
    if (sueno < 6) {
        puntos += 8;
        factores.push(
            "Pocas horas de sueño."
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
    // Somnolencia
    //----------------------------------------

    if (form.somnolencia === "Sí") {
        puntos += 5;
        factores.push(
            "Somnolencia frecuente."
        );
    }

    //----------------------------------------
    // Hipotiroidismo conocido
    //----------------------------------------

    if (form.diagnosticoHipotiroidismo === "Sí") {
        puntos += 25;
        factores.push(
            "Antecedente de hipotiroidismo."
        );
    }

    //----------------------------------------
    // Hashimoto
    //----------------------------------------

    if (form.diagnosticoHashimoto === "Sí") {
        puntos += 25;
        factores.push(
            "Antecedente de Tiroiditis de Hashimoto."
        );
    }

    //----------------------------------------
    // Hipertiroidismo
    //----------------------------------------

    if (form.diagnosticoHipertiroidismo === "Sí") {
        puntos += 20;
        factores.push(
            "Antecedente de hipertiroidismo."
        );
    }

    //----------------------------------------
    // Antecedentes familiares tiroideos
    //----------------------------------------

    if (
        form.antecedentesHipotiroidismo === "Sí" ||
        form.antecedentesHashimoto === "Sí"
    ) {
        puntos += 12;
        factores.push(
            "Antecedentes familiares de enfermedad tiroidea."
        );
    }

    //----------------------------------------
    // SOP
    //----------------------------------------

    if (form.antecedentesSOP === "Sí") {
        puntos += 15;
        factores.push(
            "Antecedente de Síndrome de Ovario Poliquístico."
        );
    }

    //----------------------------------------
    // Acné
    //----------------------------------------

    if (
        form.acne === "Sí" ||
        form.acneAdulto === "Sí"
    ) {
        puntos += 8;
        factores.push(
            "Acné asociado a alteraciones hormonales."
        );
    }

    //----------------------------------------
    // Hirsutismo
    //----------------------------------------

    if (
        form.velloExcesivo === "Sí" ||
        form.velloCara === "Sí" ||
        form.velloPecho === "Sí" ||
        form.velloAbdomen === "Sí"
    ) {
        puntos += 15;
        factores.push(
            "Hirsutismo."
        );
    }

    //----------------------------------------
    // Caída de cabello
    //----------------------------------------

    if (
        form.caidaCabello === "Sí" ||
        form.caidaCabelloMasculina === "Sí"
    ) {
        puntos += 8;
        factores.push(
            "Caída de cabello."
        );
    }

    //----------------------------------------
    // Anticonceptivos hormonales
    //----------------------------------------

    if (form.anticonceptivos === "Sí") {
        puntos += 6;
        factores.push(
            "Uso de anticonceptivos hormonales."
        );
    }

    //----------------------------------------
    // Embarazo reciente
    //----------------------------------------

    if (form.embarazos === "Sí") {
        puntos += 5;
        factores.push(
            "Antecedente de embarazo."
        );
    }

    //----------------------------------------
    // Medicamentos para tiroides
    //----------------------------------------

    if (form.medicamentosTiroides === "Sí") {
        puntos += 8;
        factores.push(
            "Uso de medicamentos para tiroides."
        );
    }

    //----------------------------------------
    // Palpitaciones
    //----------------------------------------

    if (form.palpitaciones === "Sí") {
        puntos += 6;
        factores.push(
            "Palpitaciones."
        );
    }

    //----------------------------------------
    // Intolerancia al frío
    //----------------------------------------

    if (form.intoleranciaFrio === "Sí") {
        puntos += 10;
        factores.push(
            "Intolerancia al frío."
        );
    }

    //----------------------------------------
    // Intolerancia al calor
    //----------------------------------------

    if (form.intoleranciaCalor === "Sí") {
        puntos += 10;
        factores.push(
            "Intolerancia al calor."
        );
    }

    //----------------------------------------
    // Bocio
    //----------------------------------------

    if (form.bocio === "Sí") {
        puntos += 20;
        factores.push(
            "Presencia de bocio."
        );
    }

    //----------------------------------------
    // Máximo de puntos
    //----------------------------------------

    const puntuacionMaxima = 320;

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
        color = "#43A047";
        prioridad = "Baja";

    }

    else if (porcentaje <= 40) {

        gravedad = "Precaución";
        color = "#FDD835";
        prioridad = "Media";

    }

    else if (porcentaje <= 60) {

        gravedad = "Moderado";
        color = "#FB8C00";
        prioridad = "Media";
        requiereEspecialista = true;

    }

    else if (porcentaje <= 80) {

        gravedad = "Alto";
        color = "#E53935";
        prioridad = "Alta";
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
        "Registrar las fechas de cada menstruación en la aplicación."
    );

    recomendaciones.push(
        "Mantener un peso saludable."
    );

    recomendaciones.push(
        "Dormir entre 7 y 9 horas diariamente."
    );

    recomendaciones.push(
        "Reducir niveles elevados de estrés."
    );

    recomendaciones.push(
        "Mantener una alimentación balanceada."
    );

    recomendaciones.push(
        "Evitar ejercicio excesivo sin supervisión."
    );

    if (gravedad === "Moderado") {

        recomendaciones.push(
            "Solicitar valoración con un ginecólogo."
        );

    }

    if (gravedad === "Alto") {

        recomendaciones.push(
            "Realizar estudios hormonales lo antes posible."
        );

        recomendaciones.push(
            "Descartar alteraciones endocrinas."
        );

    }

    if (gravedad === "Muy Alto") {

        recomendaciones.push(
            "Acudir con un ginecólogo y endocrinólogo para una evaluación completa."
        );

        recomendaciones.push(
            "No retrasar la valoración médica."
        );

    }

    //----------------------------------------
    // Estudios sugeridos
    //----------------------------------------

    estudios.push(
        "Prueba de embarazo (β-hCG)."
    );

    estudios.push(
        "Perfil hormonal femenino (FSH, LH, Estradiol)."
    );

    estudios.push(
        "Prolactina."
    );

    estudios.push(
        "TSH."
    );

    estudios.push(
        "T3 Libre."
    );

    estudios.push(
        "T4 Libre."
    );

    estudios.push(
        "Ultrasonido pélvico."
    );

    estudios.push(
        "Ultrasonido transvaginal."
    );

    estudios.push(
        "Perfil androgénico."
    );

    //----------------------------------------
    // Descripción
    //----------------------------------------

    let descripcion = "";

    switch (gravedad) {
        case "Normal":
            descripcion =
                "No se identifican datos suficientes que sugieran Amenorrea clínicamente significativa. Continúe registrando su ciclo menstrual.";
            break;

        case "Precaución":
            descripcion =
                "Se identifican algunos factores relacionados con alteraciones del ciclo menstrual. Se recomienda continuar el seguimiento.";
            break;

        case "Moderado":
            descripcion =
                "Existen múltiples datos compatibles con Amenorrea secundaria. Es recomendable acudir con un ginecólogo para valoración.";
            break;

        case "Alto":
            descripcion =
                "El patrón encontrado es altamente sugestivo de Amenorrea. Es importante realizar estudios hormonales y descartar enfermedades endocrinas.";
            break;

        case "Muy Alto":
            descripcion =
                "Existe un riesgo muy elevado de Amenorrea asociado a alteraciones hormonales o ginecológicas. Se recomienda valoración médica prioritaria.";
            break;
    }

    //----------------------------------------
    // Regresar resultado
    //----------------------------------------

    return {
        enfermedad: "Amenorrea",
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
            "Ginecólogo / Endocrinólogo",
        estudiosSugeridos: estudios,
        descripcion 
    };

}