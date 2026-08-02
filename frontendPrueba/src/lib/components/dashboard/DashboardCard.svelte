<script lang="ts">
    // runes mode: use $props() instead of `export let`
    const { titulo = "", subtitulo = "" } = $props();
</script>

<div class="card">

    <div class="header">

        <h3>{titulo}</h3>

        {#if subtitulo}
            <span>{subtitulo}</span>
        {/if}

    </div>

    <div class="contenido">
        <slot />
    </div>

</div>

<style>

.card{

    background:rgba(255,255,255,.05);

    border:1px solid rgba(255,255,255,.08);

    border-radius:20px;

    padding:22px;

    backdrop-filter:blur(12px);

    box-shadow:0 10px 35px rgba(0,0,0,.35);

}

.header{

    margin-bottom:18px;

}

.header h3{

    margin:0;

    color:white;

}

.header span{

    color:#888;

    font-size:13px;

}

</style>