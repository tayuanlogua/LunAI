import type { ResultadoClinico } from "$lib/clinical/interfaces";

type ResultadosClinicos = {

    sop: ResultadoClinico | null;

    endometriosis: ResultadoClinico | null;

    amenorrea: ResultadoClinico | null;

    hipotiroidismo: ResultadoClinico | null;

    hipertiroidismo: ResultadoClinico | null;

    hashimoto: ResultadoClinico | null;

};

export const clinical = $state<ResultadosClinicos>({

    sop: null,

    endometriosis: null,

    amenorrea: null,

    hipotiroidismo: null,

    hipertiroidismo: null,

    hashimoto: null

});