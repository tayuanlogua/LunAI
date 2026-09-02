<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    import { clinical } from '$lib/stores/clinical.store.svelte';
    import Header from '$lib/components/layout/Header.svelte';
    import RiskCard from '$lib/components/layout/RiskCard.svelte';
    import AgentChat from '$lib/components/AgentChat.svelte';
    import StartsBackground from '$lib/components/StartsBackground.svelte';

    let verificandoSesion = $state(true);

    onMount(() => {
        verificarSesion();
    });

    async function verificarSesion() {
        const token = localStorage.getItem('token');

        if (!token) {
            await goto('/', { replaceState: true });
            return;
        }

        try {
            const respuesta = await fetch(
                'http://localhost:5000/api/auth/profile',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!respuesta.ok) {
                throw new Error('Sesión inválida');
            }

            const datos = await respuesta.json();

            localStorage.setItem(
                'usuario',
                JSON.stringify(datos.usuario)
            );

            verificandoSesion = false;
        } catch (error) {
            console.error(error);

            localStorage.removeItem('token');
            localStorage.removeItem('usuario');

            await goto('/', { replaceState: true });
        }
    }

    async function cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        await goto('/', { replaceState: true });
    }
</script>

{#if verificandoSesion}
    <main class="verificando">
        <p>Verificando sesión...</p>
    </main>
{:else}
    <StartsBackground />

    <Header
        titulo="Dashboard 🌙"
        subtitulo="Bienvenida nuevamente a LunAI"
    />

    <div class="acciones-sesion">
        <button type="button" onclick={cerrarSesion}>
            Cerrar sesión
        </button>
    </div>

    <div class="risks">
        {#if clinical.sop}
            <RiskCard resultado={clinical.sop} />
        {/if}

        {#if clinical.endometriosis}
            <RiskCard resultado={clinical.endometriosis} />
        {/if}

        {#if clinical.amenorrea}
            <RiskCard resultado={clinical.amenorrea} />
        {/if}

        {#if clinical.hipotiroidismo}
            <RiskCard resultado={clinical.hipotiroidismo} />
        {/if}

        {#if clinical.hipertiroidismo}
            <RiskCard resultado={clinical.hipertiroidismo} />
        {/if}

        {#if clinical.hashimoto}
            <RiskCard resultado={clinical.hashimoto} />
        {/if}

        <AgentChat
            apiEndpoint="/api/agent/chat"
            title="LunAI"
            subtitle="Tu compañera inteligente"
        />
    </div>
{/if}

<style>
    .verificando {
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #100b18;
        color: #e8c968;
    }

    .acciones-sesion {
        display: flex;
        justify-content: flex-end;
        padding: 0 35px 15px;
    }

    .acciones-sesion {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 0 35px 15px;
}

    .acciones-sesion button:hover {
        background: rgba(232, 201, 104, 0.22);
    }
</style>