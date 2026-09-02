<script lang="ts">
    import { calcularTodo } from "$lib/clinical/scoreEngine";
    import StartsBackground from "$lib/components/StartsBackground.svelte";
    import { clinical } from "$lib/stores/clinical.store.svelte";

    let step = $state(1);

    const totalSteps = 12;

    let form = $state({
        // 1. Cuenta
        email: "",
        password: "",
        confirmPassword: "",

        // 2. Perfil
        nombre: "",
        birthDate: "",
        edad: "",
        peso: "",
        estatura: "",
        cintura: "",
        ocupacion: "",
        horasSentada: "",
        actividad: "",

        // 3. Ciclo menstrual
        fechaUltimaMenstruacion: "",
        ciclo: "",
        variacionCicloDias: "",
        periodo: "",
        regular: "",
        primeraMenstruacion: "",
        menstruacionesUltimoAno: "",
        ciclosAusentes: "",
        ciclosAusentesMeses: "",
        manchadoEntrePeriodos: "",
        sangradoDespuesRelaciones: "",

        // 4. Periodo
        flujo: "",
        color: "",
        coagulos: "",
        cantidadToallasDia: "",
        toallasNoche: "",
        sangradoMayor7Dias: "",
        dolorEscala: "",
        ubicacionDolor: "",
        dolorAntesMenstruacionDias: "",
        dolorOvulacion: "",
        dolorDefecarMenstruacion: "",
        dolorOrinarMenstruacion: "",
        dolorIncapacitante: "",

        // 5. Síntomas frecuentes
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

        // 6. Salud ginecológica
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

        // 7. Antecedentes
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

        // 10. SOP
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

        // 12. Tiroides
        bocio: "",
        medicamentosTiroides: "",
        diagnosticoHipotiroidismo: "",
        diagnosticoHipertiroidismo: "",
        diagnostico: ""
    });

    function siguiente() {
        if (step < totalSteps) {
            step++;
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    function atras() {
        if (step > 1) {
            step--;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    function seleccionar(
        campo: keyof typeof form,
        valor: string
    ) {
        form[campo] = valor;
    }

    function cambiarContador(
        campo: keyof typeof form,
        cambio: number,
        minimo = 0,
        maximo = 100
    ) {
        let actual = Number(form[campo]) || 0;

        actual += cambio;

        if (actual < minimo) actual = minimo;
        if (actual > maximo) actual = maximo;

        form[campo] = String(actual);
    }

    function seleccionarNo(
        campo: keyof typeof form,
        campoRelacionado?: keyof typeof form
    ) {
        form[campo] = "No";

        if (campoRelacionado) {
            form[campoRelacionado] = "";
        }
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
    }

    let progreso = $derived(
        Math.round((step / totalSteps) * 100)
    );
</script>
<StartsBackground/>

<div class="main-container">

    {#if step > 1}

        <div class="progress-container">

            <div class="progress-top">

                <div>
                    <span class="moon-small">🌙</span>

                    <span>
                        Tu viaje con LunAI
                    </span>
                </div>

                <strong>
                    {step} / {totalSteps}
                </strong>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style={`width: ${progreso}%`}
                ></div>

            </div>

            <p>
                {progreso}% completado ✨
            </p>

        </div>

    {/if}

    {#if step === 1}

<div class="card intro-card">

    <div class="luna-logo">
        🌙
    </div>

    <h1>Bienvenida a LunAI</h1>

    <p class="intro-text">
        Vamos a conocerte mejor para ayudarte
        a entender tu salud menstrual 💜
    </p>


    <div class="input-group">

        <label>¿Cuál es tu correo?</label>

        <input
            type="email"
            bind:value={form.email}
            placeholder="tu@email.com"
        >

    </div>


    <div class="input-group">

        <label>Crea una contraseña 🔐</label>

        <input
            type="password"
            bind:value={form.password}
            placeholder="Tu contraseña"
        >

    </div>


    <div class="input-group">

        <label>Confirma tu contraseña</label>

        <input
            type="password"
            bind:value={form.confirmPassword}
            placeholder="Escríbela nuevamente"
        >

    </div>


    <button
        class="primary-button"
        onclick={siguiente}
    >
        Comenzar mi viaje ✨
        <span>→</span>
    </button>


    <a class="login-link" href="/">
        Ya tengo una cuenta
    </a>

</div>

{/if}

{#if step === 2}

<div class="card">

    <div class="section-title">

        <div class="section-icon">
            👋
        </div>

        <div>
            <h2>Comencemos contigo</h2>

            <p>
                Un poco sobre ti para personalizar tu experiencia.
            </p>
        </div>

    </div>


    <!-- NOMBRE -->

    <div class="question-block">

        <h3>
            ¿Cómo te gustaría que te llamáramos?
        </h3>

        <input
            bind:value={form.nombre}
            placeholder="Tu nombre o alias"
        >

    </div>


    <!-- NACIMIENTO -->

    <div class="question-block">

        <h3>
            ¿Cuándo naciste? 🎂
        </h3>

        <input
            type="date"
            bind:value={form.birthDate}
        >

    </div>


    <!-- PESO -->

    <div class="question-block">

        <h3>
            ¿Cuál es tu peso aproximado?
        </h3>

        <div class="counter-card">

            <button
                type="button"
                onclick={() =>
                    cambiarContador(
                        "peso",
                        -1,
                        30,
                        250
                    )
                }
            >
                −
            </button>


            <div>

                <strong>
                    {form.peso || "?"}
                </strong>

                <span>kg</span>

            </div>


            <button
                type="button"
                onclick={() =>
                    cambiarContador(
                        "peso",
                        1,
                        30,
                        250
                    )
                }
            >
                +
            </button>

        </div>

    </div>


    <!-- ESTATURA -->

    <div class="question-block">

        <h3>
            ¿Cuál es tu estatura?
        </h3>

        <div class="counter-card">

            <button
                type="button"
                onclick={() =>
                    cambiarContador(
                        "estatura",
                        -1,
                        100,
                        230
                    )
                }
            >
                −
            </button>


            <div>

                <strong>
                    {form.estatura || "?"}
                </strong>

                <span>cm</span>

            </div>


            <button
                type="button"
                onclick={() =>
                    cambiarContador(
                        "estatura",
                        1,
                        100,
                        230
                    )
                }
            >
                +
            </button>

        </div>

    </div>


    <!-- CINTURA -->

    <div class="question-block">

        <h3>
            ¿Cuál es aproximadamente tu cintura?
        </h3>

        <div class="counter-card">

            <button
                type="button"
                onclick={() =>
                    cambiarContador(
                        "cintura",
                        -1,
                        40,
                        200
                    )
                }
            >
                −
            </button>


            <div>

                <strong>
                    {form.cintura || "?"}
                </strong>

                <span>cm</span>

            </div>


            <button
                type="button"
                onclick={() =>
                    cambiarContador(
                        "cintura",
                        1,
                        40,
                        200
                    )
                }
            >
                +
            </button>

        </div>

    </div>


    <!-- OCUPACIÓN -->

    <div class="question-block">

        <h3>
            ¿A qué te dedicas?
        </h3>

        <input
            bind:value={form.ocupacion}
            placeholder="Por ejemplo: estudiante, oficina..."
        >

    </div>


    <!-- HORAS SENTADA -->

    <div class="question-block">

        <h3>
            ¿Cuántas horas pasas sentada al día?
        </h3>

        <div class="option-grid">

            {#each [
                ["0-2", "🚶", "Muy poco"],
                ["3-5", "🪑", "Algunas horas"],
                ["6-8", "💻", "Gran parte del día"],
                ["9+", "🛋️", "Casi todo el día"]
            ] as opcion}

                <button
                    type="button"
                    class:selected={
                        form.horasSentada === opcion[0]
                    }
                    onclick={() =>
                        seleccionar(
                            "horasSentada",
                            opcion[0]
                        )
                    }
                >

                    <span>{opcion[1]}</span>

                    {opcion[2]}

                </button>

            {/each}

        </div>

    </div>


    <!-- ACTIVIDAD -->

    <div class="question-block">

        <h3>
            ¿Cómo describirías tu actividad diaria?
        </h3>

        <div class="option-grid">

            {#each [
                ["Sedentaria", "🛋️"],
                ["Ligera", "🚶"],
                ["Moderada", "🏃"],
                ["Alta", "🔥"]
            ] as opcion}

                <button
                    type="button"
                    class:selected={
                        form.actividad === opcion[0]
                    }
                    onclick={() =>
                        seleccionar(
                            "actividad",
                            opcion[0]
                        )
                    }
                >

                    <span>{opcion[1]}</span>

                    <strong>
                        {opcion[0]}
                    </strong>

                </button>

            {/each}

        </div>

    </div>


    <div class="buttons">

        <button
            class="back-button"
            onclick={atras}
        >
            ← Atrás
        </button>

        <button
            class="primary-button"
            onclick={siguiente}
        >
            Continuar →
        </button>

    </div>

</div>

{/if}

{#if step === 3}

<div class="card">

    <div class="section-title">

        <div class="section-icon">
            🌙
        </div>

        <div>
            <h2>Conozcamos tu ciclo</h2>

            <p>
                No hay respuestas correctas o incorrectas.
                Solo queremos conocer tu experiencia 💜
            </p>
        </div>

    </div>


    <!-- FECHA -->

    <div class="question-block">

        <h3>
            ¿Cuándo fue tu última menstruación?
        </h3>

        <p class="question-help">
            Selecciona la fecha que recuerdes 🗓️
        </p>

        <input
            type="date"
            bind:value={form.fechaUltimaMenstruacion}
        >

    </div>


    <!-- CICLO -->

    <div class="question-block">

        <h3>
            ¿Cuánto suele durar tu ciclo?
        </h3>

        <div class="option-grid">

            <button
                type="button"
                class:selected={form.ciclo === "20"}
                onclick={() =>
                    seleccionar("ciclo", "20")
                }
            >
                <span>🌱</span>

                <strong>
                    Menos de 21 días
                </strong>

                <small>Ciclo corto</small>
            </button>


            <button
                type="button"
                class:selected={form.ciclo === "28"}
                onclick={() =>
                    seleccionar("ciclo", "28")
                }
            >
                <span>🌙</span>

                <strong>
                    21 – 35 días
                </strong>

                <small>Rango frecuente</small>
            </button>


            <button
                type="button"
                class:selected={form.ciclo === "45"}
                onclick={() =>
                    seleccionar("ciclo", "45")
                }
            >
                <span>🌊</span>

                <strong>
                    Más de 45 días
                </strong>

                <small>Ciclo largo</small>
            </button>

        </div>

    </div>


    <!-- PERIODO -->

    <div class="question-block">

        <h3>
            ¿Cuántos días suele durar tu periodo?
        </h3>

        <div class="option-grid">

            {#each [
                ["2", "🌧️", "Menos de 3 días"],
                ["3", "🌸", "3 a 9 días"],
                ["10", "🌊", "Más de 9 días"]
            ] as opcion}

                <button
                    type="button"
                    class:selected={
                        form.periodo === opcion[0]
                    }
                    onclick={() =>
                        seleccionar(
                            "periodo",
                            opcion[0]
                        )
                    }
                >

                    <span>{opcion[1]}</span>

                    <strong>
                        {opcion[2]}
                    </strong>

                </button>

            {/each}

        </div>

    </div>


    <!-- REGULAR -->

    <div class="question-block">

        <h3>
            ¿Tu ciclo suele ser regular?
        </h3>

        <div class="yes-no">

            <button
                type="button"
                class:selected={form.regular === "si"}
                onclick={() =>
                    seleccionar("regular", "si")
                }
            >
                ✨ Sí, generalmente
            </button>


            <button
                type="button"
                class:selected={form.regular === "no"}
                onclick={() =>
                    seleccionar("regular", "no")
                }
            >
                🔄 No, suele variar
            </button>

        </div>

    </div>


    <!-- PRIMERA MENSTRUACIÓN -->

    <div class="question-block">

        <h3>
            ¿A qué edad tuviste tu primera menstruación?
        </h3>

        <div class="number-chips">

            {#each [8,9,10,11,12,13,14,15,16,17,18] as edad}

                <button
                    type="button"
                    class:selected={
                        form.primeraMenstruacion === String(edad)
                    }
                    onclick={() =>
                        seleccionar(
                            "primeraMenstruacion",
                            String(edad)
                        )
                    }
                >
                    {edad}
                </button>

            {/each}

        </div>

    </div>


    <!-- MENSTRUACIONES -->

    <div class="question-block">

        <h3>
            ¿Cuántas menstruaciones has tenido
            aproximadamente en el último año?
        </h3>

        <div class="counter-card">

            <button
                type="button"
                onclick={() =>
                    cambiarContador(
                        "menstruacionesUltimoAno",
                        -1,
                        0,
                        12
                    )
                }
            >
                −
            </button>


            <div>

                <strong>
                    {form.menstruacionesUltimoAno || 0}
                </strong>

                <span>
                    menstruaciones
                </span>

            </div>


            <button
                type="button"
                onclick={() =>
                    cambiarContador(
                        "menstruacionesUltimoAno",
                        1,
                        0,
                        12
                    )
                }
            >
                +
            </button>

        </div>

    </div>


    <!-- CICLOS AUSENTES -->

    <div class="question-block">

        <h3>
            ¿Has tenido meses sin menstruación?
        </h3>

        <div class="yes-no">

            <button
                type="button"
                class:selected={
                    form.ciclosAusentes === "si"
                }
                onclick={() =>
                    seleccionar(
                        "ciclosAusentes",
                        "si"
                    )
                }
            >
                Sí
            </button>


            <button
                type="button"
                class:selected={
                    form.ciclosAusentes === "No"
                }
                onclick={() =>
                    seleccionarNo(
                        "ciclosAusentes",
                        "ciclosAusentesMeses"
                    )
                }
            >
                No
            </button>

        </div>


        {#if form.ciclosAusentes === "si"}

            <div class="conditional-question">

                <h4>
                    ¿Durante cuánto tiempo?
                </h4>

                <div class="option-grid">

                    {#each [
                        "1-3 meses",
                        "4-6 meses",
                        "Más de 6 meses"
                    ] as opcion}

                        <button
                            type="button"
                            class:selected={
                                form.ciclosAusentesMeses === opcion
                            }
                            onclick={() =>
                                seleccionar(
                                    "ciclosAusentesMeses",
                                    opcion
                                )
                            }
                        >
                            🌙

                            <strong>
                                {opcion}
                            </strong>

                        </button>

                    {/each}

                </div>

            </div>

        {/if}

    </div>


    <!-- MANCHADO -->

    <div class="question-block">

        <h3>
            ¿Has tenido manchado entre periodos?
        </h3>

        <div class="yes-no">

            <button
                type="button"
                class:selected={
                    form.manchadoEntrePeriodos === "Sí"
                }
                onclick={() =>
                    seleccionar(
                        "manchadoEntrePeriodos",
                        "Sí"
                    )
                }
            >
                Sí
            </button>

            <button
                type="button"
                class:selected={
                    form.manchadoEntrePeriodos === "No"
                }
                onclick={() =>
                    seleccionar(
                        "manchadoEntrePeriodos",
                        "No"
                    )
                }
            >
                No
            </button>

        </div>

    </div>


    <!-- RELACIONES -->

    <div class="question-block">

        <h3>
            ¿Has tenido sangrado después de relaciones sexuales?
        </h3>

        <p class="question-help">
            Puedes responder con tranquilidad.
            Esta información es privada 💜
        </p>

        <div class="yes-no">

            <button
                type="button"
                class:selected={
                    form.sangradoDespuesRelaciones === "Sí"
                }
                onclick={() =>
                    seleccionar(
                        "sangradoDespuesRelaciones",
                        "Sí"
                    )
                }
            >
                Sí
            </button>

            <button
                type="button"
                class:selected={
                    form.sangradoDespuesRelaciones === "No"
                }
                onclick={() =>
                    seleccionar(
                        "sangradoDespuesRelaciones",
                        "No"
                    )
                }
            >
                No
            </button>

        </div>

    </div>


    <div class="buttons">

        <button class="back-button" onclick={atras}>
            ← Atrás
        </button>

        <button class="primary-button" onclick={siguiente}>
            Continuar →
        </button>

    </div>

</div>

{/if}

{#if step === 4}

<div class="card">

    <div class="section-title">

        <div class="section-icon">
            🌸
        </div>

        <div>
            <h2>Tu periodo</h2>

            <p>
                Cuéntanos cómo suele ser.
            </p>
        </div>

    </div>


    <!-- FLUJO -->

    <div class="question-block">

        <h3>
            ¿Cómo describirías tu flujo?
        </h3>

        <div class="option-grid">

            {#each [
                ["Ligero", "💧"],
                ["Moderado", "💧💧"],
                ["Abundante", "💧💧💧"],
                ["Muy abundante", "🌊"]
            ] as opcion}

                <button
                    type="button"
                    class:selected={form.flujo === opcion[0]}
                    onclick={() =>
                        seleccionar("flujo", opcion[0])
                    }
                >
                    <span>{opcion[1]}</span>

                    <strong>{opcion[0]}</strong>
                </button>

            {/each}

        </div>

    </div>


    <!-- COLOR -->

    <div class="question-block">

        <h3>
            ¿Qué color describe mejor tu flujo?
        </h3>

        <div class="color-options">

            {#each [
                ["Rojo brillante", "🔴"],
                ["Rojo oscuro", "🔴"],
                ["Marrón", "🟤"],
                ["Rosa", "🩷"],
                ["Variable", "🎨"]
            ] as opcion}

                <button
                    type="button"
                    class:selected={form.color === opcion[0]}
                    onclick={() =>
                        seleccionar("color", opcion[0])
                    }
                >
                    <span>{opcion[1]}</span>
                    {opcion[0]}
                </button>

            {/each}

        </div>

    </div>


    <!-- COÁGULOS -->

    <div class="question-block">

        <h3>
            ¿Has notado coágulos?
        </h3>

        <div class="yes-no">

            {#each ["Sí", "No"] as opcion}

                <button
                    type="button"
                    class:selected={form.coagulos === opcion}
                    onclick={() =>
                        seleccionar("coagulos", opcion)
                    }
                >
                    {opcion === "Sí" ? "Sí, he notado" : "No"}
                </button>

            {/each}

        </div>

    </div>


    <!-- TOALLAS DIA -->

    <div class="question-block">

        <h3>
            Aproximadamente, ¿cuántas toallas o productos
            menstruales usas durante el día?
        </h3>

        <div class="counter-card">

            <button
                type="button"
                onclick={() =>
                    cambiarContador(
                        "cantidadToallasDia",
                        -1,
                        0,
                        20
                    )
                }
            >
                −
            </button>

            <div>

                <strong>
                    {form.cantidadToallasDia || 0}
                </strong>

                <span>por día</span>

            </div>

            <button
                type="button"
                onclick={() =>
                    cambiarContador(
                        "cantidadToallasDia",
                        1,
                        0,
                        20
                    )
                }
            >
                +
            </button>

        </div>

    </div>


    <!-- NOCHE -->

    <div class="question-block">

        <h3>
            ¿Y durante la noche?
        </h3>

        <div class="counter-card">

            <button
                type="button"
                onclick={() =>
                    cambiarContador(
                        "toallasNoche",
                        -1,
                        0,
                        10
                    )
                }
            >
                −
            </button>

            <div>

                <strong>
                    {form.toallasNoche || 0}
                </strong>

                <span>por noche</span>

            </div>

            <button
                type="button"
                onclick={() =>
                    cambiarContador(
                        "toallasNoche",
                        1,
                        0,
                        10
                    )
                }
            >
                +
            </button>

        </div>

    </div>


    <!-- SANGRADO MAYOR -->

    <div class="question-block">

        <h3>
            ¿Tu sangrado suele durar más de 7 días?
        </h3>

        <div class="yes-no">

            {#each ["Sí", "No"] as opcion}

                <button
                    type="button"
                    class:selected={
                        form.sangradoMayor7Dias === opcion
                    }
                    onclick={() =>
                        seleccionar(
                            "sangradoMayor7Dias",
                            opcion
                        )
                    }
                >
                    {opcion}
                </button>

            {/each}

        </div>

    </div>


    <!-- DOLOR -->

    <div class="question-block">

        <h3>
            ¿Qué tan intenso es tu dolor menstrual?
        </h3>

        <p class="question-help">
            0 significa sin dolor y 10 el dolor más intenso.
        </p>


        <div class="pain-scale">

            {#each Array(11) as _, i}

                <button
                    type="button"
                    class:selected={
                        form.dolorEscala === String(i)
                    }
                    onclick={() =>
                        seleccionar(
                            "dolorEscala",
                            String(i)
                        )
                    }
                >
                    {i}
                </button>

            {/each}

        </div>


        <div class="scale-labels">

            <span>😊 Sin dolor</span>
            <span>😣 Muy intenso</span>

        </div>

    </div>


    <!-- UBICACIÓN -->

    <div class="question-block">

        <h3>
            ¿Dónde sientes principalmente el dolor?
        </h3>

        <div class="option-grid">

            {#each [
                ["Vientre bajo", "🩷"],
                ["Cadera", "🦴"],
                ["Espalda baja", "🔙"],
                ["Piernas", "🦵"],
                ["Varias zonas", "⚡"]
            ] as opcion}

                <button
                    type="button"
                    class:selected={
                        form.ubicacionDolor === opcion[0]
                    }
                    onclick={() =>
                        seleccionar(
                            "ubicacionDolor",
                            opcion[0]
                        )
                    }
                >
                    <span>{opcion[1]}</span>

                    {opcion[0]}

                </button>

            {/each}

        </div>

    </div>


    <!-- DOLOR ANTES -->

    <div class="question-block">

        <h3>
            ¿Cuántos días antes de menstruar
            comienza el dolor?
        </h3>

        <div class="number-chips">

            {#each [0,1,2,3,4,5,6,7,8,9,10] as dia}

                <button
                    type="button"
                    class:selected={
                        form.dolorAntesMenstruacionDias === String(dia)
                    }
                    onclick={() =>
                        seleccionar(
                            "dolorAntesMenstruacionDias",
                            String(dia)
                        )
                    }
                >
                    {dia}
                </button>

            {/each}

        </div>

    </div>


    <!-- PREGUNTAS SI/NO -->

    {#each [
        ["dolorOvulacion", "¿Sientes dolor durante la ovulación?"],
        ["dolorDefecarMenstruacion", "¿Tienes dolor al defecar durante la menstruación?"],
        ["dolorOrinarMenstruacion", "¿Tienes dolor al orinar durante la menstruación?"],
        ["dolorIncapacitante", "¿El dolor llega a impedirte realizar tus actividades?"]
    ] as pregunta}

        <div class="question-block">

            <h3>{pregunta[1]}</h3>

            <div class="yes-no">

                <button
                    type="button"
                    class:selected={
                        form[pregunta[0] as keyof typeof form] === "Sí"
                    }
                    onclick={() =>
                        seleccionar(
                            pregunta[0] as keyof typeof form,
                            "Sí"
                        )
                    }
                >
                    Sí
                </button>

                <button
                    type="button"
                    class:selected={
                        form[pregunta[0] as keyof typeof form] === "No"
                    }
                    onclick={() =>
                        seleccionar(
                            pregunta[0] as keyof typeof form,
                            "No"
                        )
                    }
                >
                    No
                </button>

            </div>

        </div>

    {/each}


    <div class="buttons">

        <button class="back-button" onclick={atras}>
            ← Atrás
        </button>

        <button class="primary-button" onclick={siguiente}>
            Continuar →
        </button>

    </div>

</div>

{/if}

{#if step === 5}

<div class="card wide-card">

    <div class="section-title">

        <div class="section-icon">
            ✨
        </div>

        <div>
            <h2>¿Cómo te has sentido?</h2>

            <p>
                Toca la opción que más se parezca a tu experiencia.
            </p>
        </div>

    </div>


    <div class="symptoms-list">

        {#each [
            ["fatiga", "😴", "Fatiga"],
            ["somnolencia", "🥱", "Somnolencia durante el día"],
            ["ansiedad", "🫨", "Ansiedad"],
            ["cambiosHumor", "🎭", "Cambios de humor"],
            ["insomnio", "🌙", "Dificultad para dormir"],
            ["migrañas", "🤕", "Migrañas"],
            ["aumentoPeso", "⚖️", "Aumento de peso"],
            ["hambreConstante", "🍽️", "Hambre constante"],
            ["antojosAzucar", "🍫", "Antojos de azúcar"],
            ["distensionAbdominal", "🎈", "Distensión abdominal"],
            ["estreñimiento", "🫤", "Estreñimiento"],
            ["diarrea", "💨", "Diarrea"],
            ["palpitaciones", "💓", "Palpitaciones"],
            ["temblores", "🫨", "Temblores"],
            ["sudorExcesivo", "💦", "Sudoración excesiva"],
            ["intoleranciaFrio", "🥶", "Sensibilidad al frío"],
            ["intoleranciaCalor", "🥵", "Sensibilidad al calor"],
            ["pielSeca", "🏜️", "Piel seca"],
            ["pielGrasa", "✨", "Piel grasa"],
            ["unasFragiles", "💅", "Uñas frágiles"],
            ["vozRonca", "🗣️", "Voz ronca"],
            ["caidaCabello", "💇", "Caída de cabello"],
            ["caidaCabelloMasculina", "🧑", "Caída de cabello en patrón masculino"],
            ["disminucionLibido", "💗", "Disminución del deseo sexual"],
            ["sequedadVaginal", "🌸", "Sequedad vaginal"]
        ] as sintoma}

            <div class="symptom-card">

                <div class="symptom-name">

                    <span>
                        {sintoma[1]}
                    </span>

                    <strong>
                        {sintoma[2]}
                    </strong>

                </div>


                <div class="frequency-options">

                    {#each [
                        "Nunca",
                        "A veces",
                        "Frecuentemente"
                    ] as frecuencia}

                        <button
                            type="button"
                            class:selected={
                                form[
                                    sintoma[0] as keyof typeof form
                                ] === frecuencia
                            }
                            onclick={() =>
                                seleccionar(
                                    sintoma[0] as keyof typeof form,
                                    frecuencia
                                )
                            }
                        >
                            {frecuencia}
                        </button>

                    {/each}

                </div>

            </div>

        {/each}

    </div>


    <div class="buttons">

        <button class="back-button" onclick={atras}>
            ← Atrás
        </button>

        <button class="primary-button" onclick={siguiente}>
            Continuar →
        </button>

    </div>

</div>

{/if}

{#if step === 6}

<div class="card">

    <div class="section-title">

        <div class="section-icon">
            🌷
        </div>

        <div>
            <h2>Tu salud ginecológica</h2>

            <p>
                Solo responde lo que conozcas.
            </p>
        </div>

    </div>


    <!-- DIAGNOSTICOS -->

    <div class="question-block">

        <h3>
            ¿Tienes algún diagnóstico previo?
        </h3>

        <input
            bind:value={form.diagnosticosPrevios}
            placeholder="Puedes escribirlo aquí"
        >

    </div>


    <!-- EMBARAZOS -->

    <div class="question-block">

        <h3>
            ¿Cuántos embarazos has tenido?
        </h3>

        <div class="counter-card">

            <button
                onclick={() =>
                    cambiarContador(
                        "embarazos",
                        -1,
                        0,
                        20
                    )
                }
            >
                −
            </button>

            <div>
                <strong>{form.embarazos || 0}</strong>
                <span>embarazos</span>
            </div>

            <button
                onclick={() =>
                    cambiarContador(
                        "embarazos",
                        1,
                        0,
                        20
                    )
                }
            >
                +
            </button>

        </div>

    </div>


    <!-- ABORTOS -->

    <div class="question-block">

        <h3>
            ¿Has tenido pérdidas gestacionales o abortos?
        </h3>

        <div class="counter-card">

            <button
                onclick={() =>
                    cambiarContador(
                        "abortos",
                        -1,
                        0,
                        20
                    )
                }
            >
                −
            </button>

            <div>
                <strong>{form.abortos || 0}</strong>
                <span>eventos</span>
            </div>

            <button
                onclick={() =>
                    cambiarContador(
                        "abortos",
                        1,
                        0,
                        20
                    )
                }
            >
                +
            </button>

        </div>

    </div>


    <!-- RESTO SI/NO -->

    {#each [
        ["abortosRecurrentes", "¿Has tenido abortos recurrentes?"],
        ["infertilidad", "¿Has tenido dificultades para lograr un embarazo?"],
        ["anticonceptivos", "¿Utilizas actualmente anticonceptivos?"],
        ["cirugiasPelvicas", "¿Has tenido cirugías pélvicas?"],
        ["miomas", "¿Te han diagnosticado miomas?"],
        ["quistesOvaricos", "¿Te han diagnosticado quistes ováricos?"]
    ] as pregunta}

        <div class="question-block">

            <h3>
                {pregunta[1]}
            </h3>

            <div class="yes-no">

                <button
                    type="button"
                    class:selected={
                        form[
                            pregunta[0] as keyof typeof form
                        ] === "Sí"
                    }
                    onclick={() =>
                        seleccionar(
                            pregunta[0] as keyof typeof form,
                            "Sí"
                        )
                    }
                >
                    Sí
                </button>

                <button
                    type="button"
                    class:selected={
                        form[
                            pregunta[0] as keyof typeof form
                        ] === "No"
                    }
                    onclick={() =>
                        seleccionar(
                            pregunta[0] as keyof typeof form,
                            "No"
                        )
                    }
                >
                    No
                </button>

            </div>

        </div>

    {/each}


    {#if form.infertilidad === "Sí"}

        <div class="conditional-question">

            <h3>
                ¿Cuánto tiempo llevas intentando?
            </h3>

            <div class="number-chips">

                {#each [
                    "Menos de 6 meses",
                    "6-12 meses",
                    "Más de 12 meses"
                ] as opcion}

                    <button
                        type="button"
                        class:selected={
                            form.tiempoBuscandoEmbarazo === opcion
                        }
                        onclick={() =>
                            seleccionar(
                                "tiempoBuscandoEmbarazo",
                                opcion
                            )
                        }
                    >
                        {opcion}
                    </button>

                {/each}

            </div>

        </div>

    {/if}


    {#if form.anticonceptivos === "Sí"}

        <div class="conditional-question">

            <h3>
                ¿Qué tipo utilizas?
            </h3>

            <div class="option-grid">

                {#each [
                    "Píldora",
                    "DIU",
                    "Implante",
                    "Inyección",
                    "Parche",
                    "Otro"
                ] as opcion}

                    <button
                        type="button"
                        class:selected={
                            form.tipoAnticonceptivo === opcion
                        }
                        onclick={() =>
                            seleccionar(
                                "tipoAnticonceptivo",
                                opcion
                            )
                        }
                    >
                        💊 {opcion}
                    </button>

                {/each}

            </div>

        </div>

    {/if}


    <!-- CESAREAS -->

    <div class="question-block">

        <h3>
            ¿Cuántas cesáreas has tenido?
        </h3>

        <div class="counter-card">

            <button
                onclick={() =>
                    cambiarContador(
                        "cesareas",
                        -1,
                        0,
                        10
                    )
                }
            >
                −
            </button>

            <div>
                <strong>{form.cesareas || 0}</strong>
                <span>cesáreas</span>
            </div>

            <button
                onclick={() =>
                    cambiarContador(
                        "cesareas",
                        1,
                        0,
                        10
                    )
                }
            >
                +
            </button>

        </div>

    </div>


    <div class="buttons">

        <button class="back-button" onclick={atras}>
            ← Atrás
        </button>

        <button class="primary-button" onclick={siguiente}>
            Continuar →
        </button>

    </div>

</div>

{/if}

{#if step === 7}

<div class="card">

    <div class="section-title">

        <div class="section-icon">
            👨‍👩‍👧
        </div>

        <div>
            <h2>Antecedentes familiares</h2>

            <p>
                ¿Algún familiar cercano ha tenido alguna de estas condiciones?
            </p>
        </div>

    </div>


    {#each [
        ["antecedentesSOP", "🌙", "Síndrome de ovario poliquístico"],
        ["antecedentesEndometriosis", "🌸", "Endometriosis"],
        ["antecedentesHipotiroidismo", "🦋", "Hipotiroidismo"],
        ["antecedentesDiabetes", "🍬", "Diabetes"],
        ["antecedentesCancerMama", "🎀", "Cáncer de mama"],
        ["antecedentesCancerOvario", "🌺", "Cáncer de ovario"]
    ] as antecedente}

        <div class="family-card">

            <div>

                <span>
                    {antecedente[1]}
                </span>

                <strong>
                    {antecedente[2]}
                </strong>

            </div>


            <div class="mini-choices">

                <button
                    type="button"
                    class:selected={
                        form[
                            antecedente[0] as keyof typeof form
                        ] === "Sí"
                    }
                    onclick={() =>
                        seleccionar(
                            antecedente[0] as keyof typeof form,
                            "Sí"
                        )
                    }
                >
                    Sí
                </button>


                <button
                    type="button"
                    class:selected={
                        form[
                            antecedente[0] as keyof typeof form
                        ] === "No"
                    }
                    onclick={() =>
                        seleccionar(
                            antecedente[0] as keyof typeof form,
                            "No"
                        )
                    }
                >
                    No
                </button>


                <button
                    type="button"
                    class:selected={
                        form[
                            antecedente[0] as keyof typeof form
                        ] === "No sé"
                    }
                    onclick={() =>
                        seleccionar(
                            antecedente[0] as keyof typeof form,
                            "No sé"
                        )
                    }
                >
                    No sé
                </button>

            </div>

        </div>

    {/each}


    <div class="question-block">

        <h3>
            ¿Existe algún otro antecedente importante?
        </h3>

        <input
            bind:value={form.antecedentes}
            placeholder="Escríbelo aquí si lo conoces"
        >

    </div>


    <div class="buttons">

        <button class="back-button" onclick={atras}>
            ← Atrás
        </button>

        <button class="primary-button" onclick={siguiente}>
            Continuar →
        </button>

    </div>

</div>

{/if}

{#if step === 8}

<div class="card wide-card">

    <div class="section-title">

        <div class="section-icon">
            🍎
        </div>

        <div>
            <h2>Tu alimentación</h2>

            <p>
                No buscamos juzgarte, solo conocer tus hábitos 💜
            </p>
        </div>

    </div>


    <!-- DIETA -->

    <div class="question-block">

        <h3>
            ¿Cómo describirías tu alimentación?
        </h3>

        <div class="option-grid">

            {#each [
                ["Variada", "🍽️"],
                ["Vegetariana", "🥬"],
                ["Vegana", "🌱"],
                ["Alta en proteína", "🥩"],
                ["Sin dieta específica", "✨"]
            ] as opcion}

                <button
                    type="button"
                    class:selected={
                        form.tipoDieta === opcion[0]
                    }
                    onclick={() =>
                        seleccionar(
                            "tipoDieta",
                            opcion[0]
                        )
                    }
                >
                    <span>{opcion[1]}</span>
                    {opcion[0]}
                </button>

            {/each}

        </div>

    </div>


    <!-- AGUA -->

    <div class="question-block">

        <h3>
            ¿Cuánta agua tomas aproximadamente al día? 💧
        </h3>

        <div class="option-grid">

            {#each [
                "Menos de 1 L",
                "1 - 1.5 L",
                "1.5 - 2 L",
                "Más de 2 L"
            ] as opcion}

                <button
                    type="button"
                    class:selected={form.aguaDiaria === opcion}
                    onclick={() =>
                        seleccionar("aguaDiaria", opcion)
                    }
                >
                    💧
                    {opcion}
                </button>

            {/each}

        </div>

    </div>


    <!-- FRECUENCIAS -->

    {#each [
        ["consumoAzucar", "🍫", "¿Con qué frecuencia consumes alimentos o bebidas azucaradas?"],
        ["frutasSemana", "🍎", "¿Cuántos días a la semana consumes fruta?"],
        ["verdurasSemana", "🥦", "¿Cuántos días a la semana consumes verduras?"],
        ["refrescosSemana", "🥤", "¿Cuántas veces tomas refresco por semana?"],
        ["comidaRapidaSemana", "🍔", "¿Cuántas veces consumes comida rápida por semana?"]
    ] as pregunta}

        <div class="question-block">

            <h3>
                {pregunta[1]}
                {pregunta[2]}
            </h3>

            <div class="frequency-scale">

                {#each [
                    "Nunca",
                    "1-2",
                    "3-4",
                    "5-6",
                    "Diario"
                ] as opcion}

                    <button
                        type="button"
                        class:selected={
                            form[
                                pregunta[0] as keyof typeof form
                            ] === opcion
                        }
                        onclick={() =>
                            seleccionar(
                                pregunta[0] as keyof typeof form,
                                opcion
                            )
                        }
                    >
                        {opcion}
                    </button>

                {/each}

            </div>

        </div>

    {/each}


    <!-- CAFÉ -->

    <div class="question-block">

        <h3>
            ☕ ¿Cuántas tazas de café tomas normalmente al día?
        </h3>

        <div class="number-chips">

            {#each [0,1,2,3,4,5] as taza}

                <button
                    type="button"
                    class:selected={
                        form.consumoCafe === String(taza)
                    }
                    onclick={() =>
                        seleccionar(
                            "consumoCafe",
                            String(taza)
                        )
                    }
                >
                    {taza === 5 ? "5+" : taza}
                </button>

            {/each}

        </div>

    </div>


    <!-- ALCOHOL -->

    <div class="question-block">

        <h3>
            🍷 ¿Consumes alcohol?
        </h3>

        <div class="yes-no">

            <button
                type="button"
                class:selected={form.alcohol === "No"}
                onclick={() =>
                    seleccionar("alcohol", "No")
                }
            >
                No
            </button>

            <button
                type="button"
                class:selected={form.alcohol === "Ocasional"}
                onclick={() =>
                    seleccionar("alcohol", "Ocasional")
                }
            >
                Ocasionalmente
            </button>

            <button
                type="button"
                class:selected={form.alcohol === "Frecuente"}
                onclick={() =>
                    seleccionar("alcohol", "Frecuente")
                }
            >
                Frecuentemente
            </button>

        </div>

    </div>


    <!-- TABACO -->

    <div class="question-block">

        <h3>
            🚬 ¿Consumes tabaco?
        </h3>

        <div class="yes-no">

            {#each ["No", "Ocasionalmente", "Sí"] as opcion}

                <button
                    type="button"
                    class:selected={form.tabaco === opcion}
                    onclick={() =>
                        seleccionar("tabaco", opcion)
                    }
                >
                    {opcion}
                </button>

            {/each}

        </div>

    </div>


    <!-- SUPLEMENTOS -->

    <div class="question-block">

        <h3>
            💊 ¿Tomas algún suplemento?
        </h3>

        <input
            bind:value={form.suplementos}
            placeholder="Por ejemplo: multivitamínico..."
        >

    </div>


    <!-- VITAMINAS -->

    <div class="question-block">

        <h3>
            ¿Tomas alguno de estos suplementos?
        </h3>

        <div class="supplements-grid">

            {#each [
                ["vitaminaD", "☀️", "Vitamina D"],
                ["hierro", "🩸", "Hierro"],
                ["omega3", "🐟", "Omega-3"]
            ] as suplemento}

                <button
                    type="button"
                    class:selected={
                        form[
                            suplemento[0] as keyof typeof form
                        ] === "Sí"
                    }
                    onclick={() =>
                        seleccionar(
                            suplemento[0] as keyof typeof form,
                            form[
                                suplemento[0] as keyof typeof form
                            ] === "Sí"
                                ? "No"
                                : "Sí"
                        )
                    }
                >
                    <span>{suplemento[1]}</span>

                    <strong>
                        {suplemento[2]}
                    </strong>

                    <small>
                        {
                            form[
                                suplemento[0] as keyof typeof form
                            ] === "Sí"
                                ? "✓ Seleccionado"
                                : "Tocar para seleccionar"
                        }
                    </small>

                </button>

            {/each}

        </div>

    </div>


    <div class="buttons">

        <button class="back-button" onclick={atras}>
            ← Atrás
        </button>

        <button class="primary-button" onclick={siguiente}>
            Continuar →
        </button>

    </div>

</div>

{/if}

{#if step === 9}

<div class="card">

    <div class="section-title">

        <div class="section-icon">
            🌿
        </div>

        <div>
            <h2>Tu estilo de vida</h2>

            <p>
                Tus hábitos también forman parte de tu bienestar.
            </p>
        </div>

    </div>


    <!-- SUEÑO -->

    <div class="question-block">

        <h3>
            🌙 ¿Cuántas horas duermes normalmente?
        </h3>

        <div class="number-chips">

            {#each [4,5,6,7,8,9,10,11,12] as hora}

                <button
                    type="button"
                    class:selected={
                        form.horasSueño === String(hora)
                    }
                    onclick={() =>
                        seleccionar(
                            "horasSueño",
                            String(hora)
                        )
                    }
                >
                    {hora}h
                </button>

            {/each}

        </div>

    </div>


    <!-- CALIDAD SUEÑO -->

    <div class="question-block">

        <h3>
            ¿Cómo calificarías la calidad de tu sueño?
        </h3>

        <div class="emoji-scale">

            {#each [
                ["1", "😫"],
                ["3", "😕"],
                ["5", "😐"],
                ["7", "🙂"],
                ["10", "😴✨"]
            ] as opcion}

                <button
                    type="button"
                    class:selected={
                        form.calidadSueno === opcion[0]
                    }
                    onclick={() =>
                        seleccionar(
                            "calidadSueno",
                            opcion[0]
                        )
                    }
                >
                    <span>{opcion[1]}</span>
                    <small>{opcion[0]}/10</small>
                </button>

            {/each}

        </div>

    </div>


    <!-- ESTRÉS -->

    <div class="question-block">

        <h3>
            ¿Cómo está tu nivel de estrés actualmente?
        </h3>

        <div class="pain-scale">

            {#each Array(11) as _, i}

                <button
                    type="button"
                    class:selected={
                        form.estresEscala === String(i)
                    }
                    onclick={() =>
                        seleccionar(
                            "estresEscala",
                            String(i)
                        )
                    }
                >
                    {i}
                </button>

            {/each}

        </div>

    </div>


    <!-- PANTALLA -->

    <div class="question-block">

        <h3>
            📱 ¿Cuántas horas pasas frente a una pantalla?
        </h3>

        <div class="option-grid">

            {#each [
                "Menos de 2h",
                "2-4h",
                "5-7h",
                "8-10h",
                "Más de 10h"
            ] as opcion}

                <button
                    type="button"
                    class:selected={
                        form.horasPantalla === opcion
                    }
                    onclick={() =>
                        seleccionar(
                            "horasPantalla",
                            opcion
                        )
                    }
                >
                    📱
                    {opcion}
                </button>

            {/each}

        </div>

    </div>


    <!-- TRABAJO Y MEDITACION -->

    {#each [
        ["trabajoNocturno", "🌃", "¿Trabajas durante la noche?"],
        ["meditacion", "🧘", "¿Practicas meditación o relajación regularmente?"]
    ] as pregunta}

        <div class="question-block">

            <h3>
                {pregunta[1]}
                {pregunta[2]}
            </h3>

            <div class="yes-no">

                {#each ["Sí", "No"] as opcion}

                    <button
                        type="button"
                        class:selected={
                            form[
                                pregunta[0] as keyof typeof form
                            ] === opcion
                        }
                        onclick={() =>
                            seleccionar(
                                pregunta[0] as keyof typeof form,
                                opcion
                            )
                        }
                    >
                        {opcion}
                    </button>

                {/each}

            </div>

        </div>

    {/each}


    <!-- EJERCICIO -->

    {#each [
        ["ejercicioSemana", "🏃", "¿Cuántos días haces ejercicio por semana?"],
        ["ejercicioCardio", "❤️", "¿Cuántos días haces cardio?"],
        ["ejercicioFuerza", "🏋️", "¿Cuántos días entrenas fuerza?"]
    ] as pregunta}

        <div class="question-block">

            <h3>
                {pregunta[1]}
                {pregunta[2]}
            </h3>

            <div class="number-chips">

                {#each [0,1,2,3,4,5,6,7] as dia}

                    <button
                        type="button"
                        class:selected={
                            form[
                                pregunta[0] as keyof typeof form
                            ] === String(dia)
                        }
                        onclick={() =>
                            seleccionar(
                                pregunta[0] as keyof typeof form,
                                String(dia)
                            )
                        }
                    >
                        {dia}
                    </button>

                {/each}

            </div>

        </div>

    {/each}


    <!-- PASOS -->

    <div class="question-block">

        <h3>
            🚶 ¿Cuál es aproximadamente tu promedio de pasos diarios?
        </h3>

        <div class="option-grid">

            {#each [
                "Menos de 3000",
                "3000-5000",
                "5000-8000",
                "8000-10000",
                "Más de 10000"
            ] as opcion}

                <button
                    type="button"
                    class:selected={
                        form.pasosDiarios === opcion
                    }
                    onclick={() =>
                        seleccionar(
                            "pasosDiarios",
                            opcion
                        )
                    }
                >
                    🚶
                    {opcion}
                </button>

            {/each}

        </div>

    </div>


    <div class="buttons">

        <button class="back-button" onclick={atras}>
            ← Atrás
        </button>

        <button class="primary-button" onclick={siguiente}>
            Continuar →
        </button>

    </div>

</div>

{/if}

{#if step === 10}

<div class="card">

    <div class="section-title">

        <div class="section-icon">
            🌙
        </div>

        <div>
            <h2>Otros cambios que podemos explorar</h2>

            <p>
                Algunas preguntas nos ayudan a identificar patrones.
            </p>
        </div>

    </div>


    {#each [
        ["acne", "🫧", "¿Presentas acné?"],
        ["acneAdulto", "✨", "¿El acné continúa o apareció en la edad adulta?"],
        ["velloExcesivo", "🌿", "¿Has notado crecimiento de vello más abundante?"],
        ["velloCara", "🙂", "¿Has notado vello grueso en la cara?"],
        ["velloPecho", "🫶", "¿Has notado vello grueso en el pecho?"],
        ["velloAbdomen", "🌸", "¿Has notado vello grueso en el abdomen?"],
        ["resistenciaInsulina", "🍬", "¿Te han diagnosticado resistencia a la insulina?"],
        ["acantosisNigricans", "🟤", "¿Has notado zonas de piel más oscura y gruesa, por ejemplo en cuello o axilas?"]
    ] as pregunta}

        <div class="question-block">

            <h3>
                {pregunta[1]}
                {pregunta[2]}
            </h3>

            <div class="yes-no">

                {#each ["Sí", "No", "No sé"] as opcion}

                    <button
                        type="button"
                        class:selected={
                            form[
                                pregunta[0] as keyof typeof form
                            ] === opcion
                        }
                        onclick={() =>
                            seleccionar(
                                pregunta[0] as keyof typeof form,
                                opcion
                            )
                        }
                    >
                        {opcion}
                    </button>

                {/each}

            </div>

        </div>

    {/each}


    <div class="buttons">

        <button class="back-button" onclick={atras}>
            ← Atrás
        </button>

        <button class="primary-button" onclick={siguiente}>
            Continuar →
        </button>

    </div>

</div>

{/if}


{#if step === 11}

<div class="card">

    <div class="section-title">

        <div class="section-icon">
            🌸
        </div>

        <div>
            <h2>Hablemos del dolor</h2>

            <p>
                Queremos entender mejor cómo afecta tu día a día.
            </p>
        </div>

    </div>


    {#each [
        ["dolorRelaciones", "¿Sientes dolor durante las relaciones sexuales?"],
        ["dolorPenetracion", "¿Sientes dolor durante la penetración?"],
        ["dolorDefecar", "¿Sientes dolor al defecar?"],
        ["dolorOrinar", "¿Sientes dolor al orinar?"],
        ["dolorLumbar", "¿Tienes dolor en la zona lumbar?"],
        ["dolorPiernas", "¿El dolor se extiende hacia las piernas?"]
    ] as pregunta}

        <div class="question-block">

            <h3>
                {pregunta[1]}
            </h3>

            <div class="frequency-options">

                {#each [
                    "Nunca",
                    "A veces",
                    "Frecuentemente"
                ] as opcion}

                    <button
                        type="button"
                        class:selected={
                            form[
                                pregunta[0] as keyof typeof form
                            ] === opcion
                        }
                        onclick={() =>
                            seleccionar(
                                pregunta[0] as keyof typeof form,
                                opcion
                            )
                        }
                    >
                        {opcion}
                    </button>

                {/each}

            </div>

        </div>

    {/each}


    <!-- AUSENCIAS -->

    <div class="question-block">

        <h3>
            ¿El dolor te ha hecho faltar al trabajo,
            escuela o actividades importantes?
        </h3>

        <div class="yes-no">

            {#each ["Nunca", "A veces", "Frecuentemente"] as opcion}

                <button
                    type="button"
                    class:selected={
                        form.ausenciasTrabajo === opcion
                    }
                    onclick={() =>
                        seleccionar(
                            "ausenciasTrabajo",
                            opcion
                        )
                    }
                >
                    {opcion}
                </button>

            {/each}

        </div>

    </div>


    <!-- ANALGESICOS -->

    <div class="question-block">

        <h3>
            ¿Con qué frecuencia necesitas analgésicos para controlar el dolor?
        </h3>

        <div class="frequency-options">

            {#each [
                "Nunca",
                "Ocasionalmente",
                "Frecuentemente",
                "Siempre"
            ] as opcion}

                <button
                    type="button"
                    class:selected={
                        form.usoAnalgesicos === opcion
                    }
                    onclick={() =>
                        seleccionar(
                            "usoAnalgesicos",
                            opcion
                        )
                    }
                >
                    {opcion}
                </button>

            {/each}

        </div>

    </div>


    <div class="buttons">

        <button class="back-button" onclick={atras}>
            ← Atrás
        </button>

        <button class="primary-button" onclick={siguiente}>
            Continuar →
        </button>

    </div>

</div>

{/if}

{#if step === 12}

<div class="card">

    <div class="section-title">

        <div class="section-icon">
            🦋
        </div>

        <div>
            <h2>Últimas preguntas</h2>

            <p>
                Ya casi terminamos ✨
            </p>
        </div>

    </div>


    {#each [
        ["bocio", "¿Alguna vez te han mencionado que tienes bocio o aumento en el tamaño de la tiroides?"],
        ["medicamentosTiroides", "¿Tomas medicamentos relacionados con la tiroides?"],
        ["diagnosticoHipotiroidismo", "¿Has sido diagnosticada con hipotiroidismo?"],
        ["diagnosticoHipertiroidismo", "¿Has sido diagnosticada con hipertiroidismo?"]
    ] as pregunta}

        <div class="question-block">

            <h3>
                🦋 {pregunta[1]}
            </h3>

            <div class="yes-no">

                {#each ["Sí", "No", "No sé"] as opcion}

                    <button
                        type="button"
                        class:selected={
                            form[
                                pregunta[0] as keyof typeof form
                            ] === opcion
                        }
                        onclick={() =>
                            seleccionar(
                                pregunta[0] as keyof typeof form,
                                opcion
                            )
                        }
                    >
                        {opcion}
                    </button>

                {/each}

            </div>

        </div>

    {/each}


    <!-- OTRO DIAGNOSTICO -->

    <div class="question-block">

        <h3>
            ¿Tienes algún otro diagnóstico que quieras mencionar?
        </h3>

        <input
            bind:value={form.diagnostico}
            placeholder="Puedes escribirlo aquí"
        >

    </div>


    <div class="final-message">

        <div class="final-moon">
            🌙
        </div>

        <h3>
            ¡Hemos terminado!
        </h3>

        <p>
            LunAI organizará tus respuestas para mostrarte
            los patrones detectados.
        </p>

    </div>


    <div class="buttons">

        <button class="back-button" onclick={atras}>
            ← Atrás
        </button>

        <button
            class="primary-button finish-button"
            onclick={finalizar}
        >
            Ver mi evaluación ✨
        </button>

    </div>

</div>

{/if}

</div>

<style lang="scss"> 
:global(*) {
    box-sizing: border-box;
}

:global(body) {
    margin: 0;
    min-height: 100vh;

    font-family: "Poppins", sans-serif;

    background:
        radial-gradient(
            circle at top,
            rgba(112, 23, 50, 0.25),
            transparent 35%
        ),
        radial-gradient(
            circle at bottom right,
            rgba(182, 149, 92, 0.12),
            transparent 30%
        ),
        linear-gradient(
            135deg,
            #050505,
            #0b0708,
            #111
        );

    color: white;
}


.main-container {
    position: relative;
    z-index: 1;

    width: 100%;
    min-height: 100vh;

    padding: 30px 20px 60px;

    display: flex;
    flex-direction: column;
    align-items: center;
}


/* =========================
   PROGRESO
========================= */

.progress-container {
    width: 100%;
    max-width: 760px;

    margin: 10px auto 10px;

    padding: 14px 20px;

    border-radius: 18px;

    background: rgba(15, 15, 15, 0.75);

    border:
        1px solid
        rgba(182, 149, 92, 0.3);

    backdrop-filter: blur(12px);
}


.progress-top {
    display: flex;

    justify-content: space-between;

    font-size: 0.85rem;

    margin-bottom: 10px;

    color: #ddd;
}


.moon-small {
    margin-right: 6px;
}


.progress-bar {
    width: 100%;
    height: 8px;

    overflow: hidden;

    border-radius: 20px;

    background:
        rgba(255,255,255,0.08);
}


.progress-fill {
    height: 100%;

    border-radius: inherit;

    background:
        linear-gradient(
            90deg,
            #701732,
            #b6955c,
            #f4d37a
        );

    transition:
        width 0.5s ease;
}


.progress-container p {
    margin: 8px 0 0;

    font-size: 0.75rem;

    text-align: right;

    color: #aaa;
}


/* =========================
   CARD
========================= */

.card {
    width: 100%;
    max-width: 760px;

    margin: 20px auto;

    padding: 35px;

    border-radius: 26px;

    background:
        linear-gradient(
            145deg,
            rgba(28, 25, 26, 0.97),
            rgba(7, 7, 7, 0.98)
        );

    border:
        1px solid
        rgba(182, 149, 92, 0.38);

    box-shadow:
        0 20px 70px rgba(0,0,0,0.45),
        0 0 35px rgba(112,23,50,0.08),
        inset 0 0 25px rgba(182,149,92,0.025);

    backdrop-filter: blur(15px);

    animation:
        aparecer 0.45s ease;
}


.wide-card {
    max-width: 850px;
}


.intro-card {
    max-width: 480px;

    text-align: center;
}


/* =========================
   TITULOS
========================= */

.section-title {
    display: flex;

    align-items: center;

    gap: 16px;

    margin-bottom: 35px;
}


.section-icon {
    min-width: 58px;
    height: 58px;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 18px;

    font-size: 1.8rem;

    background:
        linear-gradient(
            135deg,
            rgba(112,23,50,0.9),
            rgba(182,149,92,0.5)
        );

    box-shadow:
        0 8px 25px
        rgba(112,23,50,0.25);
}


.section-title h2 {
    margin: 0 0 5px;

    color: #f4d37a;

    font-size: 1.6rem;
}


.section-title p {
    margin: 0;

    color: #aaa;

    font-size: 0.88rem;
}


.intro-card h1 {
    color: #f4d37a;

    margin-bottom: 12px;
}


.intro-text {
    color: #aaa;

    line-height: 1.6;

    margin-bottom: 30px;
}


.luna-logo {
    width: 90px;
    height: 90px;

    display: flex;

    align-items: center;
    justify-content: center;

    margin: auto auto 20px;

    border-radius: 50%;

    font-size: 3rem;

    background:
        radial-gradient(
            circle,
            rgba(182,149,92,0.25),
            rgba(112,23,50,0.4)
        );

    box-shadow:
        0 0 40px
        rgba(182,149,92,0.2);
}


/* =========================
   QUESTIONS
========================= */

.question-block {
    padding: 22px 0;

    border-bottom:
        1px solid
        rgba(255,255,255,0.07);
}


.question-block:last-of-type {
    border-bottom: none;
}


.question-block h3 {
    margin: 0 0 8px;

    font-size: 1rem;

    line-height: 1.5;

    color: #f1eeee;
}


.question-help {
    margin: 0 0 15px;

    color: #929292;

    font-size: 0.82rem;
}


/* =========================
   INPUTS
========================= */

.input-group {
    text-align: left;

    margin-bottom: 18px;
}


.input-group label {
    display: block;

    margin-bottom: 8px;

    color: #ddd;

    font-size: 0.88rem;
}


input {
    width: 100%;
    height: 48px;

    padding: 0 15px;

    border-radius: 14px;

    border:
        1px solid
        rgba(255,255,255,0.1);

    outline: none;

    background:
        rgba(255,255,255,0.95);

    color: #222;

    font-family: inherit;

    transition: 0.25s;
}


input:focus {
    transform: translateY(-1px);

    border-color: #b6955c;

    box-shadow:
        0 0 0 4px
        rgba(182,149,92,0.12);
}


/* =========================
   GRIDS
========================= */

.option-grid {
    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(150px, 1fr)
        );

    gap: 12px;
}


.option-grid button {
    min-height: 100px;

    display: flex;

    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 6px;

    padding: 15px;

    border-radius: 18px;

    border:
        1px solid
        rgba(255,255,255,0.1);

    background:
        rgba(255,255,255,0.035);

    color: #eee;

    cursor: pointer;

    transition: 0.25s;
}


.option-grid button span {
    font-size: 1.5rem;
}


.option-grid button small {
    color: #888;
}


.option-grid button:hover {
    transform: translateY(-4px);

    border-color:
        rgba(182,149,92,0.6);

    background:
        rgba(182,149,92,0.06);
}


/* =========================
   SELECCIONADO
========================= */

button.selected {
    border-color: #b6955c !important;

    background:
        linear-gradient(
            135deg,
            rgba(112,23,50,0.65),
            rgba(182,149,92,0.18)
        ) !important;

    color: white;

    box-shadow:
        0 0 0 1px
        rgba(182,149,92,0.25),
        0 8px 25px
        rgba(112,23,50,0.18);
}


/* =========================
   YES / NO
========================= */

.yes-no {
    display: flex;

    flex-wrap: wrap;

    gap: 10px;
}


.yes-no button {
    flex: 1;

    min-width: 100px;

    height: 48px;

    padding: 0 15px;

    border-radius: 14px;

    border:
        1px solid
        rgba(255,255,255,0.1);

    background:
        rgba(255,255,255,0.04);

    color: #eee;

    cursor: pointer;

    transition: 0.2s;
}


.yes-no button:hover {
    background:
        rgba(255,255,255,0.08);
}


/* =========================
   NUMBER CHIPS
========================= */

.number-chips {
    display: flex;

    flex-wrap: wrap;

    gap: 10px;
}


.number-chips button {
    min-width: 48px;
    height: 48px;

    padding: 0 12px;

    border-radius: 14px;

    border:
        1px solid
        rgba(255,255,255,0.1);

    background:
        rgba(255,255,255,0.04);

    color: #eee;

    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;
}


.number-chips button:hover {
    transform: translateY(-2px);

    border-color:
        rgba(182,149,92,0.5);
}


/* =========================
   COUNTER
========================= */

.counter-card {
    display: flex;

    align-items: center;
    justify-content: center;

    gap: 25px;

    padding: 20px;

    border-radius: 20px;

    background:
        rgba(255,255,255,0.035);

    border:
        1px solid
        rgba(255,255,255,0.06);
}


.counter-card button {
    width: 55px;
    height: 55px;

    flex: none;

    border: none;

    border-radius: 50%;

    background:
        linear-gradient(
            135deg,
            #701732,
            #9a3150
        );

    color: white;

    font-size: 1.8rem;

    cursor: pointer;

    transition: 0.2s;
}


.counter-card button:hover {
    transform: scale(1.08);

    box-shadow:
        0 0 25px
        rgba(112,23,50,0.5);
}


.counter-card div {
    min-width: 130px;

    text-align: center;
}


.counter-card strong {
    display: block;

    font-size: 2.3rem;

    color: #f4d37a;
}


.counter-card span {
    color: #999;

    font-size: 0.8rem;
}


/* =========================
   PAIN SCALE
========================= */

.pain-scale {
    display: flex;

    flex-wrap: wrap;

    gap: 8px;
}


.pain-scale button {
    width: 42px;
    height: 42px;

    flex: none;

    border-radius: 12px;

    border:
        1px solid
        rgba(255,255,255,0.1);

    background:
        rgba(255,255,255,0.04);

    color: white;

    cursor: pointer;

    transition: 0.2s;
}


.pain-scale button:hover {
    transform: scale(1.08);
}


.scale-labels {
    display: flex;

    justify-content: space-between;

    margin-top: 10px;

    color: #888;

    font-size: 0.75rem;
}


/* =========================
   FREQUENCY
========================= */

.frequency-options,
.frequency-scale {
    display: flex;

    flex-wrap: wrap;

    gap: 8px;
}


.frequency-options button,
.frequency-scale button {
    flex: 1;

    min-width: 100px;

    min-height: 44px;

    padding: 8px 12px;

    border-radius: 12px;

    border:
        1px solid
        rgba(255,255,255,0.1);

    background:
        rgba(255,255,255,0.04);

    color: #eee;

    cursor: pointer;

    transition: 0.2s;
}


/* =========================
   SINTOMAS
========================= */

.symptoms-list {
    display: grid;

    gap: 10px;
}


.symptom-card {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 15px;

    padding: 16px;

    border-radius: 16px;

    background:
        rgba(255,255,255,0.025);

    border:
        1px solid
        rgba(255,255,255,0.06);
}


.symptom-name {
    display: flex;

    align-items: center;

    gap: 10px;

    min-width: 180px;
}


.symptom-name span {
    font-size: 1.4rem;
}


.symptom-name strong {
    font-size: 0.85rem;
}


.symptom-card .frequency-options {
    justify-content: flex-end;
}


/* =========================
   FAMILY
========================= */

.family-card {
    display: flex;

    justify-content: space-between;
    align-items: center;

    gap: 15px;

    padding: 17px;

    margin-bottom: 10px;

    border-radius: 16px;

    background:
        rgba(255,255,255,0.025);

    border:
        1px solid
        rgba(255,255,255,0.06);
}


.family-card > div:first-child {
    display: flex;

    align-items: center;

    gap: 10px;
}


.mini-choices {
    display: flex;

    gap: 6px;
}


.mini-choices button {
    padding: 8px 10px;

    border-radius: 10px;

    border:
        1px solid
        rgba(255,255,255,0.1);

    background:
        rgba(255,255,255,0.04);

    color: white;

    cursor: pointer;
}


/* =========================
   SUPLEMENTOS
========================= */

.supplements-grid {
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 12px;
}


.supplements-grid button {
    min-height: 110px;

    display: flex;

    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 5px;

    border-radius: 18px;

    border:
        1px solid
        rgba(255,255,255,0.1);

    background:
        rgba(255,255,255,0.03);

    color: white;

    cursor: pointer;
}


.supplements-grid span {
    font-size: 1.7rem;
}


.supplements-grid small {
    color: #888;
}


/* =========================
   EMOJI SCALE
========================= */

.emoji-scale {
    display: flex;

    justify-content: space-between;

    gap: 10px;
}


.emoji-scale button {
    flex: 1;

    min-height: 80px;

    display: flex;

    flex-direction: column;

    align-items: center;
    justify-content: center;

    border-radius: 16px;

    border:
        1px solid
        rgba(255,255,255,0.1);

    background:
        rgba(255,255,255,0.04);

    color: white;

    cursor: pointer;
}


.emoji-scale span {
    font-size: 1.7rem;
}


.emoji-scale small {
    margin-top: 5px;

    color: #aaa;
}


/* =========================
   CONDICIONAL
========================= */

.conditional-question {
    margin-top: 18px;

    padding: 20px;

    border-radius: 18px;

    background:
        rgba(112,23,50,0.12);

    border:
        1px solid
        rgba(182,149,92,0.18);

    animation:
        aparecer 0.3s ease;
}


.conditional-question h3,
.conditional-question h4 {
    margin-top: 0;
}


/* =========================
   FINAL
========================= */

.final-message {
    margin-top: 25px;

    padding: 25px;

    text-align: center;

    border-radius: 22px;

    background:
        linear-gradient(
            135deg,
            rgba(112,23,50,0.22),
            rgba(182,149,92,0.08)
        );
}


.final-moon {
    font-size: 3rem;
}


.final-message h3 {
    color: #f4d37a;
}


/* =========================
   BUTTONS
========================= */

.buttons {
    display: flex;

    gap: 15px;

    margin-top: 35px;
}


.primary-button,
.back-button {
    min-height: 50px;

    padding: 0 22px;

    border-radius: 16px;

    font-family: inherit;

    font-weight: 600;

    cursor: pointer;

    transition: 0.25s;
}


.primary-button {
    flex: 2;

    border: none;

    background:
        linear-gradient(
            90deg,
            #701732,
            #9c3d58,
            #b6955c
        );

    color: white;

    box-shadow:
        0 10px 30px
        rgba(112,23,50,0.3);
}


.primary-button:hover {
    transform: translateY(-3px);

    box-shadow:
        0 15px 35px
        rgba(112,23,50,0.5);
}


.back-button {
    flex: 1;

    border:
        1px solid
        rgba(255,255,255,0.13);

    background:
        rgba(255,255,255,0.04);

    color: #ddd;
}


.back-button:hover {
    background:
        rgba(255,255,255,0.08);
}


.finish-button {
    background:
        linear-gradient(
            90deg,
            #b6955c,
            #f4d37a,
            #b6955c
        );

    color: #1a1305;
}


/* =========================
   LINKS
========================= */

.login-link {
    display: inline-block;

    margin-top: 20px;

    color: #b6955c;

    text-decoration: none;

    font-size: 0.85rem;
}


/* =========================
   ANIMATION
========================= */

@keyframes aparecer {

    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 700px) {

    .main-container {
        padding: 15px 12px 50px;
    }


    .card {
        padding: 25px 18px;

        border-radius: 20px;
    }


    .section-title {
        align-items: flex-start;
    }


    .section-icon {
        min-width: 48px;
        height: 48px;
    }


    .section-title h2 {
        font-size: 1.3rem;
    }


    .option-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }


    .symptom-card {
        flex-direction: column;

        align-items: stretch;
    }


    .symptom-card .frequency-options {
        justify-content: stretch;
    }


    .family-card {
        flex-direction: column;

        align-items: stretch;
    }


    .mini-choices {
        width: 100%;
    }


    .mini-choices button {
        flex: 1;
    }


    .supplements-grid {
        grid-template-columns:
            1fr;
    }


    .buttons {
        flex-direction: column-reverse;
    }


    .primary-button,
    .back-button {
        width: 100%;
    }


    .emoji-scale {
        flex-wrap: wrap;
    }


    .emoji-scale button {
        min-width: 70px;
    }

}


@media (max-width: 430px) {

    .option-grid {
        grid-template-columns: 1fr;
    }


    .counter-card {
        gap: 15px;
    }


    .counter-card strong {
        font-size: 1.8rem;
    }


    .pain-scale button {
        width: 36px;
        height: 36px;
    }

}
</style>