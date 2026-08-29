//funciones reutilizables para el calculo de datos clinicos

export function calcularIMC(
    peso:number,
    estatura:number
){
    return peso/(estatura*estatura);
}