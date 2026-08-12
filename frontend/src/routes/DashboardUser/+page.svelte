<script lang="ts">
    import { clinical } from "$lib/stores/clinical.store.svelte";
    import Header from "$lib/components/layout/Header.svelte";
    import RiskCard from "$lib/components/layout/RiskCard.svelte";
    import AgentChat from '$lib/components/AgentChat.svelte';
    import StartsBackground from "$lib/components/StartsBackground.svelte";
</script>
<StartsBackground/>
<Header
    titulo="Dashboard 🌙"
    subtitulo="Bienvenida nuevamente a LunAI"
/>

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
