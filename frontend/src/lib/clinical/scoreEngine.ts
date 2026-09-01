import {calcularSOP} from "./sop";
import {calcularEndometriosis} from "./endometriosis";
import {calcularHipotiroidismo} from "./hipotiroidismo";
import {calcularHipertiroidismo} from "./hipertiroidismo";
import {calcularAmenorrea} from "./amenorrea";


export function calcularTodo(form:any){
    return{
        sop:calcularSOP(form),
        endometriosis:calcularEndometriosis(form),
        amenorrea:calcularAmenorrea(form),
        hipotiroidismo:calcularHipotiroidismo(form),
        hipertiroidismo:calcularHipertiroidismo(form)
    };

}