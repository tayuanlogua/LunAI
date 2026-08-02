<script lang="ts">
    import { goto } from "$app/navigation";

    const { cantidad = 4 } = $props();

    function abrirNotificaciones() {

        goto("/alertas");

    }
</script>

<button
    class="notification"
    aria-label="Notificaciones"
    onclick={abrirNotificaciones}>

    🔔

    {#if cantidad>0}

        <span>

            {cantidad}

        </span>

    {/if}

</button>

<style>

.notification{

    position:relative;

    width:45px;

    height:45px;

    border:none;

    border-radius:50%;

    cursor:pointer;

    background:#191919;

    color:white;

    font-size:20px;

    transition:.25s;

}

.notification:hover{

    background:#701732;

}

span{

    position:absolute;

    top:-4px;

    right:-4px;

    width:20px;

    height:20px;

    border-radius:50%;

    background:#ff5252;

    display:flex;

    justify-content:center;

    align-items:center;

    font-size:11px;

    color:white;

}

</style>