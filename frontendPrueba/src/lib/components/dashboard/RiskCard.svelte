<script lang="ts">

const { enfermedad = "", porcentaje = 0, gravedad = "Normal" } = $props();

let color = "#00c853";

if (gravedad === "Precaución")
    color = "#ffb300";

if (gravedad === "Moderado")
    color = "#ff9800";

if (gravedad === "Alto")
    color = "#ff5722";

if (gravedad === "Muy Alto")
    color = "#d50000";

</script>

<div class="risk">

    <div class="top">

        <h3>{enfermedad}</h3>

        <span style:color={color}>
            {gravedad}
        </span>

    </div>

    <div class="barra">

        <div
            class="fill"
            style:width={`${porcentaje}%`}
            style:background={color}>
        </div>

    </div>

    <h2>{porcentaje}%</h2>

</div>

<style>

.risk{

padding:20px;

background:#181818;

border-radius:18px;

}

.top{

display:flex;

justify-content:space-between;

margin-bottom:15px;

}

.barra{

height:10px;

background:#333;

border-radius:20px;

overflow:hidden;

}

.fill{

height:100%;

transition:.5s;

}

h2{

margin-top:15px;

color:white;

}

</style>