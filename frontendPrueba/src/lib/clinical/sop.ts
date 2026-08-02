import { calcularIMC } from "./helpers"; // Importa la función calcularIMC desde el archivo helpers.ts

export interface ResultadoClinico {

    enfermedad: string;
    porcentaje: number;
    gravedad: "Normal" | "Precaución" | "Moderado" | "Alto" | "Muy Alto";
    color: string;
    puntuacion: number;
    puntuacionMaxima: number;
    factores: string[];
    recomendaciones: string[];
    especialista: string;
    estudiosSugeridos: string[];
    descripcion: string;
}

export function calcularSOP(form: any): ResultadoClinico {

    let puntos = 0;
    const factores: string[] = [];
    const recomendaciones: string[] = [];
    const estudios: string[] = [];

    //----------------------------------------
    // IMC
    //----------------------------------------

    const imc = calcularIMC(Number(form.peso), Number(form.altura));

    //----------------------------------------
    // Duración del ciclo
    //----------------------------------------

    if (Number(form.ciclo) >= 35) {
        puntos += 20;
        factores.push("Ciclos mayores o iguales a 35 días.");
    }

    //----------------------------------------
    // Menstruaciones por año
    //----------------------------------------

    if (Number(form.menstruacionesUltimoAno) < 8) {
        puntos += 20;
        factores.push("Menos de 8 menstruaciones durante el último año.");
    }

    //----------------------------------------
    // Irregularidad
    //----------------------------------------

    if (form.regular === "No") {
        puntos += 10;
        factores.push("Ciclos menstruales irregulares.");
    }

    //----------------------------------------
    // Acné
    //----------------------------------------

    if (form.acne === "Sí") {
        puntos += 10;
        factores.push("Acné.");
    }

    if (form.acneAdulto === "Sí") {
        puntos += 10;
        factores.push("Acné persistente en la edad adulta.");
    }

    //----------------------------------------
    // Hirsutismo
    //----------------------------------------

    if (form.velloExcesivo === "Sí") {
        puntos += 15;
        factores.push("Vello corporal excesivo.");
    }

    if (form.velloCara === "Sí") {
        puntos += 10;
        factores.push("Vello facial.");
    }

    if (form.velloPecho === "Sí") {
        puntos += 5;
        factores.push("Vello en pecho.");
    }

    if (form.velloAbdomen === "Sí") {
        puntos += 5;
        factores.push("Vello en abdomen.");
    }

    //----------------------------------------
    // Alopecia
    //----------------------------------------

    if (form.caidaCabelloMasculina === "Sí") {
        puntos += 15;
        factores.push("Caída de cabello con patrón masculino.");
    }

    //----------------------------------------
    // Resistencia a la insulina
    //----------------------------------------

    if (form.resistenciaInsulina === "Sí") {
        puntos += 20;
        factores.push("Antecedentes de resistencia a la insulina.");
    }

    //----------------------------------------
    // Acantosis
    //----------------------------------------

    if (form.acantosisNigricans === "Sí") {
        puntos += 20;
        factores.push("Acantosis nigricans.");
    }

    //----------------------------------------
    // Aumento de peso
    //----------------------------------------
    if (form.aumentoPeso === "Sí") {
        puntos += 10;
        factores.push("Aumento de peso.");
    }

    //----------------------------------------
    // IMC
    //----------------------------------------

    if (imc >= 30) {
        puntos += 15;
        factores.push(`IMC elevado (${imc.toFixed(1)}).`);
    }

    //----------------------------------------
    // Cintura
    //----------------------------------------

    if (Number(form.cintura) >= 88) {
        puntos += 10;
        factores.push("Circunferencia de cintura elevada.");
    }

    //----------------------------------------
    // Diabetes
    //----------------------------------------

    if (form.antecedentesDiabetes === "Sí") {
        puntos += 10;
        factores.push("Antecedentes familiares de diabetes.");
    }

    //----------------------------------------
    // Antecedentes familiares
    //----------------------------------------

    if (form.antecedentesSOP === "Sí") {
        puntos += 20;
        factores.push("Antecedentes familiares de SOP.");
    }

    //----------------------------------------
    // Azúcar
    //----------------------------------------

    if (form.consumoAzucar === "Alto") {
        puntos += 5;
        factores.push("Consumo elevado de azúcar.");
    }

    //----------------------------------------
    // Ejercicio
    //----------------------------------------

    if (Number(form.ejercicioSemana) <= 1) {
        puntos += 5;
        factores.push("Actividad física insuficiente.");
    }

    //----------------------------------------
    // Máximo
    //----------------------------------------

    const puntuacionMaxima = 225;
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

    if (porcentaje <= 20) {
        gravedad = "Normal";
        color = "#4CAF50";
    }

    else if (porcentaje <= 40) {
        gravedad = "Precaución";
        color = "#FFD54F";
    }

    else if (porcentaje <= 60) {
        gravedad = "Moderado";
        color = "#FB8C00";
    }

    else if (porcentaje <= 80) {
        gravedad = "Alto";
        color = "#E53935";
    }

    else {
        gravedad = "Muy Alto";
        color = "#8E24AA";
    }

    //----------------------------------------
    // Recomendaciones
    //----------------------------------------

    if (gravedad !== "Normal") {
        recomendaciones.push(
            "Acudir con un ginecólogo para valoración clínica."
        );

        recomendaciones.push(
            "Solicitar valoración por endocrinología."
        );

        recomendaciones.push(
            "Mantener una alimentación con bajo índice glucémico."
        );

        recomendaciones.push(
            "Realizar ejercicio aeróbico y de fuerza de manera regular."
        );

        recomendaciones.push(
            "Monitorear el ciclo menstrual durante los próximos meses."
        );

    }

    //----------------------------------------
    // Estudios sugeridos
    //----------------------------------------

    estudios.push("Ultrasonido pélvico.");

    estudios.push("Glucosa en ayuno.");

    estudios.push("Insulina basal.");

    estudios.push("Perfil hormonal.");

    estudios.push("LH.");

    estudios.push("FSH.");

    estudios.push("Testosterona total y libre.");

    estudios.push("DHEA-S.");

    estudios.push("TSH.");

    estudios.push("T4 Libre.");

    //----------------------------------------

    return {

        enfermedad: "Síndrome de Ovario Poliquístico",
        porcentaje,
        gravedad,
        color,
        puntuacion: puntos,
        puntuacionMaxima,
        factores,
        recomendaciones,

        especialista:
            "Ginecólogo / Endocrinólogo",

        estudiosSugeridos: estudios,

        descripcion:
            "Este resultado representa una estimación del riesgo basada en las respuestas del formulario y no constituye un diagnóstico médico."

    };

}