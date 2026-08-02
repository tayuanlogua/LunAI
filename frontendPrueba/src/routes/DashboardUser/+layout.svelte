<script lang="ts">

    import { onMount } from "svelte";

    import Sidebar from "$lib/components/layout/Sidebar.svelte";
    import TopBar from "$lib/components/layout/TopBar.svelte";

    // Stores (cuando los vayas creando)
    // import { patient } from "$lib/stores/patient";
    // import { clinical } from "$lib/stores/clinical";
    // import { diary } from "$lib/stores/diary";
    // import { notifications } from "$lib/stores/notifications";

    let cargando = $state(true);

    onMount(async()=>{

        /*
        await Promise.all([
            patient.load(),
            clinical.load(),
            diary.load(),
            notifications.load()
        ]);
        */

        // Simulación de carga
        setTimeout(()=>{

            cargando=false;

        },800);

    });

</script>

<div class="layout">

    <!--=====================================
                SIDEBAR
    ======================================-->

    <Sidebar/>

    <!--=====================================
            CONTENIDO PRINCIPAL
    ======================================-->

    <div class="content">

        <!--============================
                TOPBAR
        ============================-->

        <TopBar/>

        <!--============================
              CONTENIDO
        ============================-->

        <main class="page">

            {#if cargando}

                <div class="loader">

                    <div class="spinner"></div>

                    <h2>Cargando LunAI...</h2>

                    <p>Analizando información clínica</p>

                </div>

            {:else}

                <slot/>

            {/if}

        </main>

    </div>

</div>

<style>

:global(body){

    margin:0;

    padding:0;

    background:#080808;

    font-family:'Poppins',sans-serif;

    overflow:hidden;

}

/*==========================
        LAYOUT
==========================*/

.layout{

    display:flex;

    width:100vw;

    height:100vh;

    overflow:hidden;

    background:

    radial-gradient(

        circle at top,

        rgba(182,149,92,.08),

        transparent 40%

    ),

    linear-gradient(

        180deg,

        #090909,

        #050505

    );

}

/*==========================
        CONTENIDO
==========================*/

.content{

    flex:1;

    display:flex;

    flex-direction:column;

    min-width:0;

}

/*==========================
        PAGINA
==========================*/

.page{

    flex:1;

    overflow-y:auto;

    overflow-x:hidden;

    padding:35px;

}

/*==========================
        SCROLL
==========================*/

.page::-webkit-scrollbar{

    width:8px;

}

.page::-webkit-scrollbar-track{

    background:#111;

}

.page::-webkit-scrollbar-thumb{

    background:#b6955c;

    border-radius:20px;

}

.page::-webkit-scrollbar-thumb:hover{

    background:#e6cb8b;

}

/*==========================
        LOADER
==========================*/

.loader{

    width:100%;

    height:100%;

    display:flex;

    flex-direction:column;

    justify-content:center;

    align-items:center;

    color:white;

}

.spinner{

    width:65px;

    height:65px;

    border-radius:50%;

    border:6px solid rgba(255,255,255,.12);

    border-top:6px solid #b6955c;

    animation:girar 1s linear infinite;

    margin-bottom:25px;

}

@keyframes girar{

    from{

        transform:rotate(0deg);

    }

    to{

        transform:rotate(360deg);

    }

}

.loader h2{

    color:#d9b15f;

    margin-bottom:10px;

}

.loader p{

    color:#888;

}

</style>