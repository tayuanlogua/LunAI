<script lang="ts">

    const { titulo = "Dashboard", subtitulo = "" } = $props();

</script>

<div class="header">

    <div>

        <h1>

            {titulo}

        </h1>

        <p>

            {subtitulo}

        </p>

    </div>

</div>

<style>

.header{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:30px;

}

h1{

    color:white;

    margin:0;

    font-size:32px;

}

p{

    color:#999;

    margin-top:8px;

}

</style>