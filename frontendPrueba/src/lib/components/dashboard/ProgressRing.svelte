<script lang="ts">

const { porcentaje = 72 } = $props();

const radio = 60;

const circunferencia = 2 * Math.PI * radio;

const offset = $derived(circunferencia - (porcentaje / 100) * circunferencia);

</script>

<div class="ring">

<svg width="170" height="170">

<circle

cx="85"

cy="85"

r={radio}

stroke="#333"

stroke-width="12"

fill="none"

/>

<circle

cx="85"

cy="85"

r={radio}

stroke="#b6955c"

stroke-width="12"

fill="none"

stroke-dasharray={circunferencia}

stroke-dashoffset={offset}

stroke-linecap="round"

transform="rotate(-90 85 85)"

/>

</svg>

<div class="texto">

<h2>{porcentaje}%</h2>

<p>Salud</p>

</div>

</div>

<style>

.ring{

position:relative;

width:170px;

height:170px;

}

.texto{

position:absolute;

inset:0;

display:flex;

flex-direction:column;

justify-content:center;

align-items:center;

color:white;

}

svg{

overflow:visible;

}

</style>