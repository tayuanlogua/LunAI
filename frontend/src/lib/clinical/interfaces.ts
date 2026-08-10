//Aqui se define como sera el resultado 
//de la prediccion de la enfermedad, con su porcentaje de acierto, 
// gravedad, color, factores y recomendaciones
//Todos los cálculos regresarán exactamente esa estructura.

export interface ResultadoClinico {
    enfermedad: string;
    porcentaje: number;
    gravedad:
        | "Normal"
        | "Precaución"
        | "Moderado"
        | "Alto"
        | "Muy Alto";

    color: string;
    puntuacion: number;
    puntuacionMaxima: number;
    factores: string[];
    recomendaciones: string[];
    especialista: string;
    estudiosSugeridos: string[];
    descripcion: string;
    prioridad: "Baja" | "Media" | "Alta" | "Urgente";
    requiereEspecialista: boolean;

    
}