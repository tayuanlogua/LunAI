<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    // svelte-ignore non_reactive_update
    let collapsed: boolean = false;

    const menu = [
        {
            title: "Dashboard",
            icon: "🏠",
            route: "/dashboard"
        },
        {
            title: "Mi Perfil",
            icon: "👤",
            route: "/perfil"
        },
        {
            title: "Mi Ciclo",
            icon: "🩸",
            route: "/ciclo"
        },
        {
            title: "Registro Diario",
            icon: "📝",
            route: "/diario"
        },
        {
            title: "Estadísticas",
            icon: "📈",
            route: "/estadisticas"
        },
        {
            title: "Riesgos Clínicos",
            icon: "⚠️",
            route: "/riesgos"
        },
        {
            title: "Profesionales",
            icon: "👩‍⚕️",
            route: "/profesionales"
        },
        {
            title: "Alertas",
            icon: "🔔",
            route: "/alertas"
        },
        {
            title: "Configuración",
            icon: "⚙️",
            route: "/configuracion"
        }
    ];

    function abrir(ruta:string){

        goto(ruta);

    }
</script>

<aside class:collapsed>

    <div class="logo">

        🌙

        {#if !collapsed}

            <h2>LunAI</h2>

        {/if}

    </div>

    <nav>

        {#each menu as item}

            <button
                class:selected={$page.url.pathname===item.route}
                onclick={()=>abrir(item.route)}>

                <span class="icon">

                    {item.icon}

                </span>

                {#if !collapsed}

                    <span>

                        {item.title}

                    </span>

                {/if}

            </button>

        {/each}

    </nav>


    <button
        class="collapse"
        onclick={()=>collapsed=!collapsed}>

        {collapsed ? "➡️" : "⬅️"}

    </button>

</aside>