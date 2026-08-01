<script lang="ts">
    let step = $state(1);

    let form = {
        //1. Cuenta
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: "",

        //2. Perfil
        nombre: "",
        peso: "",
        edad: "",
        estatura: "",
        actividad: "",

        //3. Ciclo :)
        primeraMenstruacion: "",
        ciclo: "",
        periodo: "",
        regular: "",

        // 4. Periodo :)s
        flujo: "",
        color: "",
        coagulos: "",
        dolor: "",
        ubicacionDolor: "",

        // 5. Sintomas frecuentes
        acne: "",
        caidaCabello: "",
        VelloExcesivo: "",
        AumentoPeso: "",
        Fatiga: "",
        Ansiedad: "",
        cambiosHumor: "",
        DolorRelaciones: "",

        // 6. Salud Ginecologica
        diagnosticosPrevios: "",
        anticonceptivos: "",
        tipoAnticonceptivo: "",
        embarazos: "",
        abortos: "",

        // 7. Alimentación
        TipoDieta: "",
        ConsumoAzucar: "",
        AguaDiaria: "",

        // 8. Estilo de vida
        HorasSueño: "",
        Estrés: "",
        ejercicioSemana: "",
    };

    function siguiente() {
        step++;
    }

    function atras() {
        step--;
    }

    function finalizar() {
        console.log(form);
        // Aquí puedes enviar los datos a tu API
        location.href = "/login"; // Redirige a la página de inicio de sesión después de finalizar
    }
</script>


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
    <input
        type="date"
        bind:value={form.birthDate}>
    <button onclick={siguiente}>
        Crear cuenta
    </button>
    <a href="/login">
		Volver a iniciar sesión
	</a>
</div>
{/if}

<!-- Paso 2 - Bienvenida -->
{#if step === 2}
<div class="card">

<h2>Bienvenida</h2>

<input bind:value={form.nombre} placeholder="Nombre">

<div class="row">
    <input bind:value={form.peso} placeholder="Peso">

    <input bind:value={form.edad} placeholder="Edad">
</div>

<input
    bind:value={form.estatura}
    placeholder="Estatura">

<select bind:value={form.actividad}>
    <option value="">Nivel de actividad</option>
    <option>Sedentaria</option>
    <option>Ligera</option>
    <option>Moderada</option>
    <option>Alta</option>
</select>

<div class="buttons">
    <button onclick={atras}>Atrás</button>

    <button onclick={siguiente}>Siguiente</button>
</div>

</div>
{/if}
<!-- Paso 3 - Ciclo menstrual -->
{#if step === 3}
<div class="card">

<h2>Tu ciclo menstrual</h2>

<input
    bind:value={form.primeraMenstruacion}
    placeholder="Edad de primera menstruación">

<input
    bind:value={form.ciclo}
    placeholder="Duración promedio del ciclo">

<input
    bind:value={form.periodo}
    placeholder="Duración del periodo">

<p>¿Es regular?</p>

<label>
    <input
        type="radio"
        bind:group={form.regular}
        value="Sí">
    Sí
</label>

<label>
    <input
        type="radio"
        bind:group={form.regular}
        value="No">
    No
</label>

<div class="buttons">
    <button onclick={atras}>Atrás</button>

    <button onclick={siguiente}>Siguiente</button>
</div>

</div>
{/if}
<!-- Paso 4 - Sobre tu periodo -->
{#if step === 4}
<div class="card">

<h2>Sobre tu periodo</h2>

<select bind:value={form.flujo}>
    <option value="">Flujo</option>
    <option>Ligero</option>
    <option>Moderado</option>
    <option>Abundante</option>
</select>

<select bind:value={form.color}>
    <option value="">Color</option>
    <option>Rojo</option>
    <option>Oscuro</option>
    <option>Marrón</option>
</select>
<select bind:value={form.coagulos}>
    <option value="">Coágulos</option>
    <option>si</option>
    <option>No</option>
</select>


<select bind:value={form.dolor}>
    <option value="">Dolor</option>
    <option>Ninguno</option>
    <option>Leve</option>
    <option>Moderado</option>
    <option>Severo</option>
</select>

<input
    bind:value={form.ubicacionDolor}
    placeholder="Ubicación del dolor">

<div class="buttons">
    <button onclick={atras}>Atrás</button>

    <button onclick={siguiente}>
        siguiente
    </button>
</div>

</div>
{/if}

<!-- Paso 5 - Sintomas frecuentes -->
{#if step === 5}
<div class="card">
<h2>Sintomas frecuentes</h2>
<select bind:value={form.acne}>
    <option value="">Acné</option>
    <option>si</option>
    <option>No</option>
</select>

<select bind:value={form.caidaCabello}>
    <option value="">Caída de cabello</option>
    <option>si</option>
    <option>No</option>
</select>

<select bind:value={form.VelloExcesivo}>
    <option value="">Vello excesivo</option>
    <option>si</option>
    <option>No</option>
</select>

<select bind:value={form.AumentoPeso}>
    <option value="">Aumento de peso</option>
    <option>si</option>
    <option>No</option>
</select>

<select bind:value={form.Fatiga}>
    <option value="">Fatiga</option>
    <option>si</option>
    <option>No</option>
</select>

<select bind:value={form.Ansiedad}>
    <option value="">Ansiedad</option>
    <option>si</option>
    <option>No</option>
</select>

<select bind:value={form.cambiosHumor}>
    <option value="">Cambios de humor</option>
    <option>si</option>
    <option>No</option>
</select>

<select bind:value={form.DolorRelaciones}>
    <option value="">Dolor durante relaciones sexuales</option>
    <option>si</option>
    <option>No</option>
</select>

<div class="buttons">
    <button onclick={atras}>Atrás</button>

    <button onclick={siguiente}>Siguiente</button>
</div>
</div>
{/if}
<!-- Paso 6 - Salud Ginecologica -->
{#if step === 6}
<div class="card">
<h2>Salud Ginecologica</h2>
<input bind:value={form.diagnosticosPrevios} placeholder="Diagnosticos previos">
<select bind:value={form.anticonceptivos}>
    <option value="">Anticonceptivos</option>
    <option>si</option>
    <option>No</option>
</select>
<input bind:value={form.tipoAnticonceptivo} placeholder="Tipo de anticonceptivo">
<select bind:value={form.embarazos}>
    <option value="">Embarazos</option>
    <option>si</option>
    <option>No</option>
</select>
<select bind:value={form.abortos}>
    <option value="">Abortos</option>
    <option>si</option>
    <option>No</option>
</select>

<div class="buttons">
    <button onclick={atras}>Atrás</button>

    <button onclick={siguiente}>Siguiente</button>
</div>

</div>
{/if}
<!-- Paso 7 - Alimentación -->
{#if step === 7}
<div class="card">
<h2>Alimentación</h2>

<select bind:value={form.TipoDieta}>
    <option value="">Tipo de dieta</option>
    <option>Vegetariana</option>
    <option>Vegana</option>
    <option>Omnívora</option>
    <option>keto</option>
</select>

<select bind:value={form.ConsumoAzucar}>
    <option value="">Consumo de azúcar</option>
    <option>Alto</option>
    <option>Moderado</option>
    <option>Bajo</option>
</select>

<input bind:value={form.AguaDiaria} placeholder="Agua diaria (litros)" />


<div class="buttons">
    <button onclick={atras}>Atrás</button>

    <button onclick={siguiente}>Siguiente</button>
</div>

</div>
{/if}
<!-- Paso 8 - Estilo de vida -->
{#if step === 8}
<div class="card">
<h2>Estilo de vida</h2>

<input bind:value={form.HorasSueño} 
placeholder="Horas de sueño">

<select bind:value={form.Estrés}>
    <option value="">Nivel de estrés</option>
    <option>Bajo</option>
    <option>Moderado</option>
    <option>Alto</option>
</select>

<input
    bind:value={form.ejercicioSemana}
    placeholder="Ejercicio por semana (veces)">


<div class="buttons">
    <button onclick={atras}>Atrás</button>

    <button onclick={finalizar}>Finalizar</button>
</div>

</div>
{/if}




<style>
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


/* Radio */

label {

    display:inline-flex;

    align-items:center;

    gap:8px;

    margin-right:15px;

    color:#ddd;

    font-size:14px;

}


input[type="radio"] {

    width:auto;

    height:auto;

    accent-color:#ffd700;

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
:global(body){
    background-image:
    url("/estrellas.jpg"),
    linear-gradient(#050505,#000);
    
    background-size:cover;
    background-position:center;
}
</style>