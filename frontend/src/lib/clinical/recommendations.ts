import type { ResultadoClinico } from "./interfaces";



export interface RecomendacionSalud {

    titulo: string;

    descripcion: string;

    acciones: string[];

    alimentos?: string[];

    evitar?: string[];

}



export function generarRecomendaciones(
    resultado: ResultadoClinico
): RecomendacionSalud[] {


    const recomendaciones: RecomendacionSalud[] = [];



    //----------------------------------------
    // Recomendaciones generales
    //----------------------------------------

    recomendaciones.push({

        titulo:
            "Seguimiento de síntomas",

        descripcion:
            "Llevar un registro diario ayuda a identificar patrones relacionados con hormonas, energía y ciclo menstrual.",

        acciones: [

            "Registrar síntomas diariamente.",

            "Anotar cambios en menstruación.",

            "Registrar niveles de energía y estado emocional."

        ]

    });



    //----------------------------------------
    // Endometriosis
    //----------------------------------------

    if (
        resultado.enfermedad === "Endometriosis"
    ) {


        recomendaciones.push({

            titulo:
                "Apoyo para síntomas inflamatorios",

            descripcion:
                "Una alimentación antiinflamatoria puede ayudar a disminuir procesos asociados con dolor e inflamación.",

            acciones: [

                "Realizar actividad física moderada.",

                "Dormir entre 7 y 9 horas.",

                "Aplicar calor local para molestias menstruales."

            ],

            alimentos: [

                "Pescados ricos en omega 3.",

                "Frutas y verduras.",

                "Nueces y semillas."

            ],

            evitar: [

                "Exceso de alimentos ultraprocesados.",

                "Consumo elevado de azúcar."

            ]

        });

    }



    //----------------------------------------
    // Hipotiroidismo
    //----------------------------------------

    if (
        resultado.enfermedad === "Hipotiroidismo"
    ) {


        recomendaciones.push({

            titulo:
                "Apoyo al metabolismo tiroideo",

            descripcion:
                "Los hábitos saludables pueden favorecer el bienestar mientras se realiza una valoración médica.",

            acciones: [

                "Mantener horarios regulares de comida.",

                "Realizar actividad física progresiva.",

                "Controlar cambios de peso."

            ],

            alimentos: [

                "Proteínas de buena calidad.",

                "Huevos.",

                "Pescado.",

                "Legumbres.",

                "Alimentos con selenio y zinc."

            ],

            evitar: [

                "Dietas extremadamente restrictivas.",

                "Suplementos tiroideos sin indicación médica."

            ]

        });

    }



    //----------------------------------------
    // Hipertiroidismo
    //----------------------------------------

    if (
        resultado.enfermedad === "Hipertiroidismo"
    ) {


        recomendaciones.push({

            titulo:
                "Control de síntomas metabólicos",

            descripcion:
                "El hipertiroidismo puede aumentar el gasto energético y afectar energía, sueño y frecuencia cardíaca.",

            acciones: [

                "Mantener buena hidratación.",

                "Evitar exceso de estimulantes.",

                "Descansar adecuadamente."

            ],

            alimentos: [

                "Alimentos ricos en proteína.",

                "Frutas.",

                "Verduras.",

                "Grasas saludables."

            ],

            evitar: [

                "Exceso de cafeína.",

                "Bebidas energéticas.",

                "Ayunos prolongados."

            ]

        });

    }





    //----------------------------------------
    // Nivel de riesgo alto
    //----------------------------------------

    if (
        resultado.prioridad === "Alta" ||
        resultado.prioridad === "Urgente"
    ) {


        recomendaciones.push({

            titulo:
                "Valoración médica recomendada",

            descripcion:
                "Los síntomas detectados justifican una valoración profesional para confirmar o descartar alteraciones.",

            acciones: [

                `Consultar con ${resultado.especialista}.`,

                "Llevar historial de síntomas.",

                "Presentar estudios previos si existen."

            ]

        });

    }



    //----------------------------------------
    // Ciclo menstrual
    //----------------------------------------

    recomendaciones.push({

        titulo:
            "Monitoreo hormonal",

        descripcion:
            "Las alteraciones tiroideas pueden influir en menstruación, ovulación y fertilidad.",

        acciones: [

            "Registrar duración del ciclo.",

            "Registrar cambios en flujo menstrual.",

            "Anotar dolor, fatiga y cambios emocionales."

        ]

    });



    return recomendaciones;

}