<script lang="ts">

    import Header from "$lib/components/layout/Header.svelte";

    import DashboardCard from "$lib/components/dashboard/DashboardCard.svelte";
    import StatisticCard from "$lib/components/dashboard/StatisticCard.svelte";
    import RiskCard from "$lib/components/dashboard/RiskCard.svelte";
    import ProgressRing from "$lib/components/dashboard/ProgressRing.svelte";
    import CalendarWidget from "$lib/components/dashboard/CalendarWidget.svelte";

    // Temporalmente con datos de prueba.
    // Después estos valores vendrán de los stores.

    const estadisticas = [

        {
            titulo:"Próximo periodo",
            valor:"4 días",
            icono:"🩸"
        },

        {
            titulo:"Ovulación",
            valor:"12 días",
            icono:"🌸"
        },

        {
            titulo:"Peso",
            valor:"68 kg",
            icono:"⚖️"
        },

        {
            titulo:"IMC",
            valor:"23.4",
            icono:"💚"
        }

    ];

    const riesgos = [

        {
            enfermedad:"Síndrome de Ovario Poliquístico",
            porcentaje:72,
            gravedad:"Alto"
        },

        {
            enfermedad:"Endometriosis",
            porcentaje:48,
            gravedad:"Moderado"
        },

        {
            enfermedad:"Amenorrea",
            porcentaje:10,
            gravedad:"Normal"
        },

        {
            enfermedad:"Hipotiroidismo",
            porcentaje:63,
            gravedad:"Moderado"
        }

    ];

</script>

<Header

titulo="Dashboard"

subtitulo="Bienvenida nuevamente a LunAI"/>

<!--==================================
        TARJETAS SUPERIORES
===================================-->

<div class="stats">

    {#each estadisticas as stat}

        <StatisticCard

            titulo={stat.titulo}

            valor={stat.valor}

            icono={stat.icono}/>

    {/each}

</div>

<!--==================================
        RIESGOS CLÍNICOS
===================================-->

<div class="risk-grid">

    {#each riesgos as riesgo}

        <RiskCard

            enfermedad={riesgo.enfermedad}

            porcentaje={riesgo.porcentaje}

            gravedad={riesgo.gravedad}/>

    {/each}

</div>

<!--==================================
        PANEL CENTRAL
===================================-->

<div class="dashboard-grid">

    <DashboardCard

        titulo="Índice General de Salud"

        subtitulo="Resultado del análisis clínico">

        <ProgressRing porcentaje={81}/>

    </DashboardCard>

    <DashboardCard

        titulo="Registro Diario"

        subtitulo="Selecciona un día para registrar síntomas">

        <CalendarWidget/>

    </DashboardCard>

</div>

<!--==================================
        ALERTAS
===================================-->

<DashboardCard

titulo="Alertas Clínicas"

subtitulo="Basadas en tus síntomas">

<div class="alerts">

    <div class="alert high">

        ⚠️ Riesgo elevado de SOP.

    </div>

    <div class="alert medium">

        🩸 Dolor menstrual superior al promedio.

    </div>

    <div class="alert low">

        🥗 Se recomienda disminuir azúcares refinados.

    </div>

    <div class="alert info">

        💧 Incrementa tu consumo diario de agua.

    </div>

    <div class="alert specialist">

        👩🏻‍⚕️ Agenda una consulta con un ginecólogo.

    </div>

</div>

</DashboardCard>

<style>

.stats{

    display:grid;

    grid-template-columns:repeat(4,1fr);

    gap:20px;

    margin-bottom:25px;

}

.risk-grid{

    display:grid;

    grid-template-columns:repeat(4,1fr);

    gap:20px;

    margin-bottom:25px;

}

.dashboard-grid{

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:20px;

    margin-bottom:25px;

}

.alerts{

    display:flex;

    flex-direction:column;

    gap:15px;

}

.alert{

    padding:15px;

    border-radius:12px;

    color:white;

    font-weight:500;

}

.high{

    background:#7d1212;

}

.medium{

    background:#9b6200;

}

.low{

    background:#295d1d;

}

.info{

    background:#18446d;

}

.specialist{

    background:#4d2d7d;

}

@media(max-width:1300px){

    .stats{

        grid-template-columns:repeat(2,1fr);

    }

    .risk-grid{

        grid-template-columns:repeat(2,1fr);

    }

    .dashboard-grid{

        grid-template-columns:1fr;

    }

}

@media(max-width:700px){

    .stats{

        grid-template-columns:1fr;

    }

    .risk-grid{

        grid-template-columns:1fr;

    }

}

</style>