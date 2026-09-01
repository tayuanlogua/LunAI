<script lang="ts">
    import { calcularTodo } from "$lib/clinical/scoreEngine";
    import StartsBackground from "$lib/components/StartsBackground.svelte";
    import { clinical } from "$lib/stores/clinical.store.svelte";

    let step = $state(1);

    let form = $state({
        //1. Cuenta
        email: "",
        password: "",
        confirmPassword: "",
        
        //2. Perfil
        nombre: "",
        birthDate: "",
        edad: "",
        peso: "",
        estatura: "",
        cintura: "",
        ocupacion: "",
        horasSentada: "",
        actividad: "",

        //3. Ciclo menstrual
        fechaUltimaMenstruacion: "",
        ciclo: "",
        variacionCicloDias: "",
        periodo: "",
        regular: "",
        primeraMenstruacion: "",
        menstruacionesUltimoAno: "",
        ciclosAusentes: "",
        ciclosAusentesMeses:"",
        manchadoEntrePeriodos:"",
        sangradoDespuesRelaciones:"",
        

        // 4. Periodo :)s
        flujo: "",
        color: "",
        coagulos: "",
        cantidadToallasDia: "",
        toallasNoche: "",
        sangradoMayor7Dias: "",       
        dolorEscala: "",   
        ubicacionDolor: "",
        dolorAntesMenstruacionDias:"",
        dolorOvulacion: "",
        dolorDefecarMenstruacion: "",
        dolorOrinarMenstruacion: "",
        dolorIncapacitante: "",


        // 5. Sintomas frecuentes
        fatiga: "",
        somnolencia: "",
        ansiedad: "",
        cambiosHumor: "",
        insomnio: "",
        migrañas: "",
        aumentoPeso: "",
        hambreConstante: "",
        antojosAzucar: "",
        distensionAbdominal: "",
        estreñimiento: "",
        diarrea: "",
        palpitaciones: "",
        temblores: "",
        sudorExcesivo: "",
        intoleranciaFrio: "",
        intoleranciaCalor: "",
        pielSeca: "",
        pielGrasa: "",
        unasFragiles: "",
        vozRonca: "",
        caidaCabello: "",
        caidaCabelloMasculina: "",
        disminucionLibido: "",
        sequedadVaginal: "",

        // 6. Salud Ginecologica
        diagnosticosPrevios: "",
        embarazos: "",
        abortos: "",
        abortosRecurrentes: "",
        infertilidad: "",
        tiempoBuscandoEmbarazo: "",
        anticonceptivos: "",
        tipoAnticonceptivo: "",
        cirugiasPelvicas: "",
        cesareas: "",
        miomas: "",
        quistesOvaricos: "",
        
        //7.antecedentes familiares
        antecedentesSOP: "",
        antecedentesEndometriosis: "",
        antecedentesHipotiroidismo: "",
        antecedentes: "",
        antecedentesDiabetes: "",
        antecedentesCancerMama: "",
        antecedentesCancerOvario: "",
        
        // 8. Alimentación
        tipoDieta: "",
        aguaDiaria: "",
        consumoAzucar: "",
        frutasSemana: "",
        verdurasSemana: "",
        refrescosSemana: "",
        comidaRapidaSemana: "",
        consumoCafe: "",
        alcohol: "",
        tabaco: "",
        suplementos: "",
        vitaminaD: "",
        hierro: "",
        omega3: "",

        // 9. Estilo de vida
        horasSueño: "",
        calidadSueno: "",
        estresEscala: "",
        horasPantalla: "",
        trabajoNocturno: "",
        meditacion: "",
        ejercicioSemana: "",
        ejercicioCardio: "",
        ejercicioFuerza: "",
        pasosDiarios: "",
        

        // 10. sop
        acne: "",
        acneAdulto: "",
        velloExcesivo: "",
        velloCara: "",
        velloPecho: "",
        velloAbdomen: "",
        resistenciaInsulina: "",
        acantosisNigricans: "",

        // 11. Endometriosis
        dolorRelaciones: "",
        dolorPenetracion: "",
        dolorDefecar: "",
        dolorOrinar: "",
        dolorLumbar: "",
        dolorPiernas: "",
        ausenciasTrabajo: "",
        usoAnalgesicos: "",

        // 12. evaluacion tiroides
        bocio: "",
        medicamentosTiroides: "",
        diagnosticoHipotiroidismo: "",
        diagnosticoHipertiroidismo: "",
        diagnostico: ""
    });

    function siguiente() {
        step++;
    }

    function atras() {
        step--;
    }

    function finalizar() {
        console.log("DATOS DEL FORMULARIO:");
        console.log(form);
        const resultados = calcularTodo(form);
        
        clinical.sop = resultados.sop;
        clinical.endometriosis = resultados.endometriosis;
        clinical.amenorrea = resultados.amenorrea;
        clinical.hipotiroidismo = resultados.hipotiroidismo;
        clinical.hipertiroidismo = resultados.hipertiroidismo;
        
        console.log("Resultados guardados:", clinical);
        location.href = "/DashboardUser";

        // Aquí puedes enviar los datos a tu API
        //location.href = "/"; // Redirige a la página de inicio de sesión después de finalizar
    }

</script>

<StartsBackground/>
<div class ="main-container">

<!-- Paso 1 - Crear cuenta -->
{#if step === 1}
<div class="card">
    <h2>Crear cuenta</h2>
    <input bind:value={form.email} placeholder="Correo electrónico">
    <input
        type="password"
        bind:value={form.password}
        placeholder="Contraseña">
    <input
        type="password"
        bind:value={form.confirmPassword}
        placeholder="Confirmar contraseña">
        <button onclick={siguiente}>
            Crear cuenta
        </button>
        <a href="/">
            Volver a iniciar sesión
        </a>
    </div>
    {/if}
    
<!-- Paso 2 - Bienvenida -->
{#if step === 2}
    <div class="card">
        <h2>Bienvenida</h2>
        
        <input bind:value={form.nombre} placeholder="Nombre o alias">
        <p> 🎂 Fecha de cumpleaños</p>
        <input
            type="date"
            bind:value={form.birthDate}>

        <div class="row">
            <input 
            maxLength="3"
            bind:value={form.peso} placeholder="Peso">
            
            <input 
            maxLength="3"
            bind:value={form.edad} placeholder="Edad">
        </div>
        <div class="row">
            <input 
            maxLength="3"
            bind:value={form.estatura} placeholder="Estatura">
            <input
            maxLength="3"
            bind:value={form.cintura} placeholder="Cintura">
        </div>

        <input
            bind:value={form.ocupacion}
            placeholder="Ocupación">

        <div class="row">
            <input 
            type="number"
            maxLength="2"
            bind:value={form.horasSentada} placeholder="Horas sentada">
            <select bind:value={form.actividad}>
                <option value="">Nivel de actividad</option>
                <option>Sedentaria</option>
                <option>Ligera</option>
                <option>Moderada</option>
                <option>Alta</option>
            </select>
        </div>
        


<div class="buttons">
    <button onclick={atras}>Atrás</button>

    <button onclick={siguiente}>Siguiente</button>
</div>

</div>
{/if}

<!-- Paso 3 - Ciclo menstrual -->
{#if step === 3}
<div class="card">
    <h2>Ciclo menstrual</h2>
    <p>Última fecha de mestruación</p>
    <input
        type="date"
        bind:value={form.fechaUltimaMenstruacion}
        placeholder="Fecha de última menstruación">

    <div class="row">
        <select bind:value={form.ciclo}>
            <option value="">Duración del ciclo (días)</option>
            <option value="20">menos de 21 dias</option>
            <option value="28">entre 21 a 35 días</option>
            <option value="45">más de 45 días</option>
        </select>
          <select bind:value={form.periodo}>
            <option value=""> Duración del perio en días</option>
            <option value="2">menos de 3 días</option>
            <option value="3">entre 3 a 9 días</option>
            <option value="10">más de 9 días</option>
        </select>
</div>
<div class="row">
        <select bind:value={form.regular}>
            <option value="">¿Tu ciclo es regular?</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
        </select>
    </div>

    <div class="row">
        <select bind:value={form.primeraMenstruacion}>
            <option value="">Edad primera mestruación</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
        </select>
        
        <select 
            bind:value={form.menstruacionesUltimoAno}>
            <option value="">Número de mestruaciones al año</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>

        </select>
    </div>  

    <div class="row">
        <select bind:value={form.ciclosAusentes} 
             placeholder="¿Has tenido ciclos ausentes?">
            <option value="">¿Has tenido ciclos ausentes?</option>
            <option value="si">Sí</option>
            <option value="No">No</option>
        </select>

        <select 
            disabled={form.ciclosAusentes !== 'si'}
            bind:value={form.ciclosAusentesMeses} placeholder="Si es así, ¿cuántos meses?">  
            <option value="">Seleccione</option>
            <option value="1-3 meses">1-3 meses</option>
            <option value="4-6 meses">4-6 meses</option>
            <option value="Más de 6 meses">Más de 6 meses</option>
        </select>
    </div>

    <div class="row">
        <select bind:value={form.manchadoEntrePeriodos}>
            <option value="">¿Has tenido manchados entre periodos?</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
        </select>
        <select bind:value={form.sangradoDespuesRelaciones}>
            <option value="">¿Has tenido sangrado después de relaciones sexuales?</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
        </select>  
    </div> 
    
    <div class="buttons">
        <button onclick={atras}>Atrás</button>
        <button onclick={siguiente}>Siguiente</button>
    </div>
</div>

{/if}

<!-- Paso 4 - Periodo -->
{#if step === 4}
<div class="card">
    <h2>Periodo</h2>
    <input bind:value={form.flujo} placeholder="Flujo">
    <input bind:value={form.color} placeholder="Color del flujo">
    <input bind:value={form.coagulos} placeholder="¿Tienes coágulos?">
    <input bind:value={form.cantidadToallasDia} placeholder="Cantidad de toallas por día">
    <input bind:value={form.toallasNoche} placeholder="Cantidad de toallas por noche">
    <input bind:value={form.sangradoMayor7Dias} placeholder="¿Tu sangrado dura más de 7 días?">
    <input bind:value={form.dolorEscala} placeholder="Dolor (escala del 1 al 10)">
    <input bind:value={form.ubicacionDolor} placeholder="Ubicación del dolor">
    <input bind:value={form.dolorAntesMenstruacionDias} placeholder="Dolor antes de la menstruación (días)">
    <input bind:value={form.dolorOvulacion} placeholder="¿Tienes dolor durante la ovulación?">
    <input bind:value={form.dolorDefecarMenstruacion} placeholder="¿Tienes dolor al defecar durante la menstruación?">
    <input bind:value={form.dolorOrinarMenstruacion} placeholder="¿Tienes dolor al orinar durante la menstruación?">
    <input bind:value={form.dolorIncapacitante} placeholder="¿El dolor es incapacitante?">
    <div class="buttons">
        <button onclick={atras}>Atrás</button>
        <button onclick={siguiente}>Siguiente</button>
    </div>
</div>
{/if}

<!-- Paso 5 - Sintomas frecuentes -->
{#if step === 5}
<div class="card">
    <h2>Síntomas frecuentes</h2>
    <input bind:value={form.fatiga} placeholder="Fatiga">
    <input bind:value={form.somnolencia} placeholder="Somnolencia">
    <input bind:value={form.ansiedad} placeholder="Ansiedad">
    <input bind:value={form.cambiosHumor} placeholder="Cambios de humor">
    <input bind:value={form.insomnio} placeholder="Insomnio">
    <input bind:value={form.migrañas} placeholder="Migrañas">
    <input bind:value={form.aumentoPeso} placeholder="Aumento de peso">
    <input bind:value={form.hambreConstante} placeholder="Hambre constante">
    <input bind:value={form.antojosAzucar} placeholder="Antojos de azúcar">
    <input bind:value={form.distensionAbdominal} placeholder="Distensión abdominal">
    <input bind:value={form.estreñimiento} placeholder="Estreñimiento">
    <input bind:value={form.diarrea} placeholder="Diarrea">
    <input bind:value={form.palpitaciones} placeholder="Palpitaciones">
    <input bind:value={form.temblores} placeholder="Temblores">
    <input bind:value={form.sudorExcesivo} placeholder="Sudor excesivo">
    <input bind:value={form.intoleranciaFrio} placeholder="Intolerancia al frío">
    <input bind:value={form.intoleranciaCalor} placeholder="Intolerancia al calor">
    <input bind:value={form.pielSeca} placeholder="Piel seca">
    <input bind:value={form.pielGrasa} placeholder="Piel grasa">
    <input bind:value={form.unasFragiles} placeholder="Uñas frágiles">
    <input bind:value={form.vozRonca} placeholder="Voz ronca">
    <input bind:value={form.caidaCabello} placeholder="Caída de cabello">
    <input bind:value={form.caidaCabelloMasculina} placeholder="Caída de cabello tipo masculina">
    <input bind:value={form.disminucionLibido} placeholder="Disminución de libido">
    <input bind:value={form.sequedadVaginal} placeholder="Sequedad vaginal">
    <div class="buttons">
        <button onclick={atras}>Atrás</button>
        <button onclick={siguiente}>Siguiente</button>
    </div>
</div>
{/if}

<!-- Paso 6 - Salud Ginecologica -->
{#if step === 6}    
<div class="card">
    <h2>Salud Ginecológica</h2>
    <input bind:value={form.diagnosticosPrevios} placeholder="Diagnósticos previos">
    <input bind:value={form.embarazos} placeholder="Número de embarazos">
    <input bind:value={form.abortos} placeholder="Número de abortos">
    <input bind:value={form.abortosRecurrentes} placeholder="Abortos recurrentes">
    <input bind:value={form.infertilidad} placeholder="Infertilidad">
    <input bind:value={form.tiempoBuscandoEmbarazo} placeholder="Tiempo buscando embarazo (meses)">
    <input bind:value={form.anticonceptivos} placeholder="Uso de anticonceptivos">
    <input bind:value={form.tipoAnticonceptivo} placeholder="Tipo de anticonceptivo">
    <input bind:value={form.cirugiasPelvicas} placeholder="Cirugías pélvicas">
    <input bind:value={form.cesareas} placeholder="Número de cesáreas">
    <input bind:value={form.miomas} placeholder="Miomas">
    <input bind:value={form.quistesOvaricos} placeholder="Quistes ováricos">
    <div class="buttons">
        <button onclick={atras}>Atrás</button>
        <button onclick={siguiente}>Siguiente</button>
    </div>
</div>
{/if}

<!-- Paso 7 - Antecedentes familiares -->
{#if step === 7}    
<div class="card">
    <h2>Antecedentes familiares</h2>
    <input bind:value={form.antecedentesSOP} placeholder="Síndrome de ovario poliquístico (SOP)">
    <input bind:value={form.antecedentesEndometriosis} placeholder="Endometriosis">
    <input bind:value={form.antecedentesHipotiroidismo} placeholder="Hipotiroidismo">
    <input bind:value={form.antecedentes} placeholder="Enfermedad de ">
    <input bind:value={form.antecedentesDiabetes} placeholder="Diabetes">
    <input bind:value={form.antecedentesCancerMama} placeholder="Cáncer de mama">
    <input bind:value={form.antecedentesCancerOvario} placeholder="Cáncer de ovario">
    <div class="buttons">
        <button onclick={atras}>Atrás</button>
        <button onclick={siguiente}>Siguiente</button>
    </div>
</div>
{/if}

<!-- Paso 8 - Alimentación -->
{#if step === 8}
<div class="card">
    <h2>Alimentación</h2>
    <input bind:value={form.tipoDieta} placeholder="Tipo de dieta">
    <input bind:value={form.aguaDiaria} placeholder="Cantidad de agua diaria (litros)">
    <input bind:value={form.consumoAzucar} placeholder="Consumo de azúcar (veces por semana)">
    <input bind:value={form.frutasSemana} placeholder="Frutas por semana">
    <input bind:value={form.verdurasSemana} placeholder="Verduras por semana">
    <input bind:value={form.refrescosSemana} placeholder="Refrescos por semana">
    <input bind:value={form.comidaRapidaSemana} placeholder="Comida rápida por semana">
    <input bind:value={form.consumoCafe} placeholder="Consumo de café (tazas por día)">
    <input bind:value={form.alcohol} placeholder="Consumo de alcohol (veces por semana)">
    <input bind:value={form.tabaco} placeholder="Consumo de tabaco (veces por semana)">
    <input bind:value={form.suplementos} placeholder="Suplementos que tomas">
    <input bind:value={form.vitaminaD} placeholder="Vitamina D (UI/día)">
    <input bind:value={form.hierro} placeholder="Hierro (mg/día)">
    <input bind:value={form.omega3} placeholder="Omega-3 (mg/día)">
    <div class="buttons">
        <button onclick={atras}>Atrás</button>
        <button onclick={siguiente}>Siguiente</button>
    </div>
</div>
{/if}

<!-- Paso 9 - Estilo de vida -->
{#if step === 9}
<div class="card">
    <h2>Estilo de vida</h2>
    <input bind:value={form.horasSueño} placeholder="Horas de sueño por noche">
    <input bind:value={form.calidadSueno} placeholder="Calidad del sueño (1-10)">
    <input bind:value={form.estresEscala} placeholder="Nivel de estrés (1-10)">
    <input bind:value={form.horasPantalla} placeholder="Horas frente a pantallas por día">
    <input bind:value={form.trabajoNocturno} placeholder="¿Trabajas de noche?">
    <input bind:value={form.meditacion} placeholder="¿Meditas regularmente?">
    <input bind:value={form.ejercicioSemana} placeholder="Días de ejercicio por semana">
    <input bind:value={form.ejercicioCardio} placeholder="Días de ejercicio cardiovascular por semana">
    <input bind:value={form.ejercicioFuerza} placeholder="Días de entrenamiento de fuerza por semana">
    <input bind:value={form.pasosDiarios} placeholder="Promedio de pasos diarios">
    <div class="buttons">
        <button onclick={atras}>Atrás</button>
        <button onclick={siguiente}>Siguiente</button>
    </div>
</div>
{/if}

<!-- Paso 10 - SOP -->
{#if step === 10}
<div class="card">
    <h2>Síndrome de Ovario Poliquístico (SOP)</h2>
    <input bind:value={form.acne} placeholder="Acné">
    <input bind:value={form.acneAdulto} placeholder="Acné en edad adulta">
    <input bind:value={form.velloExcesivo} placeholder="Vello excesivo">
    <input bind:value={form.velloCara} placeholder="Vello en la cara">
    <input bind:value={form.velloPecho} placeholder="Vello en el pecho">
    <input bind:value={form.velloAbdomen} placeholder="Vello en el abdomen">
    <input bind:value={form.resistenciaInsulina} placeholder="Resistencia a la insulina">
    <input bind:value={form.acantosisNigricans} placeholder="Acantosis nigricans">
    <div class="buttons">
        <button onclick={atras}>Atrás</button>
        <button onclick={siguiente}>Siguiente</button>
    </div>
</div>
{/if}

<!-- Paso 11 - Endometriosis -->
{#if step === 11}
<div class="card">
    <h2>Endometriosis</h2>
    <input bind:value={form.dolorRelaciones} placeholder="Dolor durante relaciones sexuales">
    <input bind:value={form.dolorPenetracion} placeholder="Dolor durante la penetración">
    <input bind:value={form.dolorDefecar} placeholder="Dolor al defecar">
    <input bind:value={form.dolorOrinar} placeholder="Dolor al orinar">
    <input bind:value={form.dolorLumbar} placeholder="Dolor lumbar">
    <input bind:value={form.dolorPiernas} placeholder="Dolor en las piernas">
    <input bind:value={form.ausenciasTrabajo} placeholder="Ausencias en el trabajo por dolor">
    <input bind:value={form.usoAnalgesicos} placeholder="Uso de analgésicos para el dolor">
    <div class="buttons">
        <button onclick={atras}>Atrás</button>
        <button onclick={siguiente}>Siguiente</button>
    </div>
</div>
{/if}   

<!-- Paso 12 - Evaluación de tiroides -->
{#if step === 12}
<div class="card">
    <h2>Evaluación de tiroides</h2>
    <input bind:value={form.bocio} placeholder="Bocio">
    <input bind:value={form.medicamentosTiroides} placeholder="Uso de medicamentos para la tiroides">
    <input bind:value={form.diagnosticoHipotiroidismo} placeholder="Diagnóstico de hipotiroidismo">
    <input bind:value={form.diagnosticoHipertiroidismo} placeholder="Diagnóstico de hipertiroidismo">
    <input bind:value={form.diagnostico} placeholder="Diagnóstico de ">
    <div class="buttons">
        <button onclick={atras}>Atrás</button>
        <button onclick={finalizar}>Finalizar</button>
    </div>
</div>
{/if}
</div>









<style>
.main-container {
    position: relative;
    z-index: 1;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

:global(body) {
    margin: 0;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif;
    background:
        radial-gradient(circle at top, rgba(255,215,100,.25), transparent 35%),
        linear-gradient(
            135deg,
            #020202,
            #080808,
            #111
        );

    color: white;
}


/* Fondo general */
:global(body)::before {
    content: "";
    position: fixed;
    inset: 0;

    background-image:
        radial-gradient(#ffffff 1px, transparent 1px);

    background-size: 35px 35px;
    opacity: .15;

    pointer-events:none;
}


/* Contenedor principal */
.card {

    width: 330px;

    padding: 28px 25px;

    margin: 60px auto;

    border-radius: 18px;

    background:
        linear-gradient(
            145deg,
            rgba(30,30,25,.95),
            rgba(5,5,5,.95)
        );


    border: 1px solid rgba(255,215,0,.45);


    box-shadow:

        0 0 25px rgba(255,215,0,.15),
        inset 0 0 20px rgba(255,215,0,.05);


    backdrop-filter: blur(8px);

}


/* Títulos */

.card h2 {

    text-align:center;

    font-size:22px;

    margin-bottom:25px;

    color:#f7d45c;

    text-shadow:
        0 0 8px rgba(255,215,0,.6);

}


/* Inputs */

input,
select {

    width:100%;

    box-sizing:border-box;

    height:38px;

    margin-bottom:14px;

    padding:0 12px;


    border-radius:8px;

    border:none;

    outline:none;


    background:
        rgba(255,255,255,.95);


    color:#333;

    font-size:14px;

}


/* Placeholder */

input::placeholder {

    color:#777;

}


/* Select */

select {

    cursor:pointer;

}


/* Filas */

.row {

    display:flex;

    gap:10px;

}


.row input {

    width:50%;

}


/* Botones */

.buttons {

    display:flex;

    justify-content:space-between;

    gap:15px;

    margin-top:20px;

}


button {

    flex:1;

    height:38px;


    border:none;

    border-radius:20px;


    background:

    linear-gradient(
        90deg,
        #e6b900,
        #ffd900
    );


    color:#171000;

    font-weight:bold;

    cursor:pointer;


    box-shadow:

    0 0 12px rgba(255,215,0,.4);


    transition:.3s;

}


button:hover {

    transform:translateY(-2px);

    box-shadow:

    0 0 22px rgba(255,215,0,.7);

}

.btnlogin {
    width: 100%;
    background: linear-gradient(90deg, #f6d45d, #e3bc3b);
    color: #111;
    box-shadow: 0 0 30px rgba(255,213,79,.35);
}

/* Animación al cambiar de paso */

.card {

    animation:

    aparecer .4s ease;

}


@keyframes aparecer {

    from {

        opacity:0;

        transform:translateY(20px);

    }

    to {

        opacity:1;

        transform:translateY(0);

    }

}


/* Responsive */

@media(max-width:450px){

    .card {

        width:85%;

    }

}
</style>