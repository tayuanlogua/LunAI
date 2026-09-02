<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    import Header from '$lib/components/layout/Header.svelte';
    import StartsBackground from '$lib/components/StartsBackground.svelte';

    type RegistroSintomas = {
        id_sintoma: number;
        fecha: string;
        dolor: number | null;
        acne: boolean | null;
        cansancio: boolean | null;
        dolor_cabeza: boolean | null;
        hinchazon: boolean | null;
        estado_emocional: string | null;
    };

    let fecha = $state('');
    let dolor = $state(0);
    let acne = $state(false);
    let cansancio = $state(false);
    let dolorCabeza = $state(false);
    let hinchazon = $state(false);
    let estadoEmocional = $state('');

    let guardando = $state(false);
    let verificando = $state(true);
    let mensaje = $state('');
    let error = $state('');
    let registros = $state<RegistroSintomas[]>([]);

    onMount(() => {
        fecha = new Date().toISOString().slice(0, 10);
        iniciarPagina();
    });

    async function iniciarPagina() {
        const token = localStorage.getItem('token');

        if (!token) {
            await goto('/', { replaceState: true });
            return;
        }

        try {
            const respuestaPerfil = await fetch(
                'http://localhost:5000/api/auth/profile',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!respuestaPerfil.ok) {
                throw new Error('Sesión inválida');
            }

            await cargarRegistros(token);
            verificando = false;
        } catch (err) {
            console.error(err);

            localStorage.removeItem('token');
            localStorage.removeItem('usuario');

            await goto('/', { replaceState: true });
        }
    }

    async function cargarRegistros(token: string) {
        const respuesta = await fetch(
            'http://localhost:5000/api/sintomas',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!respuesta.ok) {
            throw new Error('No fue posible consultar los síntomas');
        }

        const datos = await respuesta.json();
        registros = datos.sintomas;
    }

    async function guardarRegistro(event: SubmitEvent) {
        event.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            await goto('/', { replaceState: true });
            return;
        }

        if (!fecha) {
            error = 'Selecciona la fecha del registro';
            return;
        }

        guardando = true;
        mensaje = '';
        error = '';

        try {
            const respuesta = await fetch(
                'http://localhost:5000/api/sintomas',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        fecha,
                        dolor,
                        acne,
                        cansancio,
                        dolor_cabeza: dolorCabeza,
                        hinchazon,
                        estado_emocional: estadoEmocional
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                error =
                    datos.message ||
                    'No fue posible guardar el registro';
                return;
            }

            mensaje = 'Registro diario guardado correctamente';

            await cargarRegistros(token);

            dolor = 0;
            acne = false;
            cansancio = false;
            dolorCabeza = false;
            hinchazon = false;
            estadoEmocional = '';
        } catch (err) {
            console.error(err);
            error = 'No fue posible conectar con el servidor';
        } finally {
            guardando = false;
        }
    }

    function mostrarFecha(valor: string) {
        return new Date(valor).toLocaleDateString('es-CO', {
            timeZone: 'UTC'
        });
    }
</script>

{#if verificando}
    <main class="verificando">
        <p>Verificando sesión...</p>
    </main>
{:else}
    <StartsBackground />

    <Header
        titulo="Registro diario 🌙"
        subtitulo="Cuéntale a LunAI cómo te sientes hoy"
    />

    <main class="contenedor">
        <section class="tarjeta">
            <form onsubmit={guardarRegistro}>
                <label>
                    Fecha
                    <input type="date" bind:value={fecha} required />
                </label>

                <label>
                    Intensidad del dolor: <strong>{dolor}/10</strong>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        bind:value={dolor}
                    />
                </label>

                <fieldset>
                    <legend>Síntomas de hoy</legend>

                    <label class="opcion">
                        <input type="checkbox" bind:checked={acne} />
                        Acné
                    </label>

                    <label class="opcion">
                        <input type="checkbox" bind:checked={cansancio} />
                        Cansancio
                    </label>

                    <label class="opcion">
                        <input
                            type="checkbox"
                            bind:checked={dolorCabeza}
                        />
                        Dolor de cabeza
                    </label>

                    <label class="opcion">
                        <input
                            type="checkbox"
                            bind:checked={hinchazon}
                        />
                        Hinchazón
                    </label>
                </fieldset>

                <label>
                    Estado emocional
                    <select bind:value={estadoEmocional}>
                        <option value="">Selecciona una opción</option>
                        <option value="Tranquila">Tranquila</option>
                        <option value="Feliz">Feliz</option>
                        <option value="Ansiosa">Ansiosa</option>
                        <option value="Triste">Triste</option>
                        <option value="Irritable">Irritable</option>
                        <option value="Cansada">Cansada</option>
                    </select>
                </label>

                {#if mensaje}
                    <p class="mensaje">{mensaje}</p>
                {/if}

                {#if error}
                    <p class="error">{error}</p>
                {/if}

                <button type="submit" disabled={guardando}>
                    {guardando ? 'Guardando...' : 'Guardar registro'}
                </button>
            </form>
        </section>

        <section class="tarjeta">
            <div class="encabezado-historial">
                <h2>Historial reciente</h2>

                <button
                    type="button"
                    class="secundario"
                    onclick={() => goto('/DashboardUser')}
                >
                    Volver al Dashboard
                </button>
            </div>

            {#if registros.length === 0}
                <p class="vacio">Aún no tienes registros diarios.</p>
            {:else}
                <div class="historial">
                    {#each registros as registro (registro.id_sintoma)}
                        <article>
                            <div>
                                <strong>{mostrarFecha(registro.fecha)}</strong>
                                <span>Dolor: {registro.dolor ?? 0}/10</span>
                            </div>

                            <p>
                                {registro.estado_emocional || 'Sin estado emocional'}
                            </p>

                            <small>
                                {registro.acne ? 'Acné · ' : ''}
                                {registro.cansancio ? 'Cansancio · ' : ''}
                                {registro.dolor_cabeza ? 'Dolor de cabeza · ' : ''}
                                {registro.hinchazon ? 'Hinchazón' : ''}
                            </small>
                        </article>
                    {/each}
                </div>
            {/if}
        </section>
    </main>
{/if}

<style>
    .verificando {
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #100b18;
        color: #efd36f;
    }

    .contenedor {
        position: relative;
        display: grid;
        grid-template-columns: minmax(280px, 520px) minmax(280px, 1fr);
        gap: 24px;
        padding: 10px 35px 40px;
        color: #f4ead8;
    }

    .tarjeta {
        padding: 25px;
        border: 1px solid rgba(239, 211, 111, 0.22);
        border-radius: 20px;
        background: rgba(20, 17, 24, 0.92);
    }

    form,
    label {
        display: grid;
        gap: 9px;
    }

    form {
        gap: 20px;
    }

    input[type="date"],
    select {
        padding: 12px;
        border: 1px solid rgba(239, 211, 111, 0.25);
        border-radius: 10px;
        background: #19151e;
        color: white;
    }

    fieldset {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        border: 1px solid rgba(239, 211, 111, 0.2);
        border-radius: 12px;
        padding: 16px;
    }

    .opcion {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    button {
        padding: 12px 18px;
        border: 0;
        border-radius: 10px;
        background: #e9c95f;
        color: #211a09;
        font-weight: 700;
        cursor: pointer;
    }

    button:disabled {
        cursor: wait;
        opacity: 0.6;
    }

    .secundario {
        background: transparent;
        border: 1px solid rgba(239, 211, 111, 0.35);
        color: #efd36f;
    }

    .encabezado-historial {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    }

    .historial {
        display: grid;
        gap: 12px;
        margin-top: 18px;
    }

    article {
        padding: 15px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
    }

    article div {
        display: flex;
        justify-content: space-between;
        gap: 12px;
    }

    article p,
    article small {
        color: #bdb2c5;
    }

    .mensaje {
        color: #8fd49b;
    }

    .error {
        color: #f19a91;
    }

    .vacio {
        color: #aaa0b2;
    }

    @media (max-width: 850px) {
        .contenedor {
            grid-template-columns: 1fr;
            padding: 10px 18px 30px;
        }

        fieldset {
            grid-template-columns: 1fr;
        }

        .encabezado-historial {
            align-items: flex-start;
            flex-direction: column;
        }
    }
</style><h1>Aqui va el form para registro diario</h1>