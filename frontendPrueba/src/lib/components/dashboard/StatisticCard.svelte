<script lang="ts">
const { titulo = "", valor = "", icono = "📊", color = "#b6955c" } = $props();
</script>

<div class="stat">

    <div class="icono">

        {icono}

    </div>

    <div>

        <small>{titulo}</small>

        <h2>{valor}</h2>

    </div>

</div>

<style>

.stat{

display:flex;

gap:15px;

align-items:center;

padding:20px;

border-radius:18px;

background:#1b1b1b;

}

.icono{

width:55px;

height:55px;

display:flex;

justify-content:center;

align-items:center;

font-size:28px;

border-radius:50%;

background:rgba(182,149,92,.2);

}

small{

color:#999;

}

h2{

margin:0;

color:white;

}

</style>