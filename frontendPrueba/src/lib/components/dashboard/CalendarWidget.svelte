<script lang="ts">

const dias=[
"L","M","M","J","V","S","D"
];

const fechas=Array.from({length:35},(_,i)=>i+1);

let seleccionado=12;

</script>

<div class="calendar">

<h3>

Registro diario

</h3>

<div class="week">

{#each dias as d}

<div>{d}</div>

{/each}

</div>

<div class="days">

{#each fechas as dia}

<button

class:selected={dia===seleccionado}

onclick={()=>seleccionado=dia}>

{dia}

</button>

{/each}

</div>

</div>

<style>

.calendar{

padding:20px;

border-radius:20px;

background:#181818;

}

.week{

display:grid;

grid-template-columns:repeat(7,1fr);

margin-bottom:15px;

text-align:center;

color:#888;

}

.days{

display:grid;

grid-template-columns:repeat(7,1fr);

gap:10px;

}

button{

aspect-ratio:1;

border:none;

border-radius:12px;

background:#2d2d2d;

color:white;

cursor:pointer;

}

.selected{

background:#b6955c;

color:black;

font-weight:bold;

}

</style>