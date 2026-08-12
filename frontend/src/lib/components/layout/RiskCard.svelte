<script lang="ts">
    import type { ResultadoClinico } from "$lib/clinical/interfaces";

    interface Props {
        resultado: ResultadoClinico | null;
    }

    let { resultado }: Props = $props();

    function obtenerClase(gravedad: string) {
        switch (gravedad) {
            case "Normal":
                return "normal";

            case "Precaución":
                return "precaucion";

            case "Moderado":
                return "moderado";

            case "Alto":
                return "alto";

            case "Muy Alto":
                return "muy-alto";

            default:
                return "normal";
        }
    }
</script>



{#if resultado}

<div class="risk-card">


    <!-- ENCABEZADO -->

    <div class="risk-header">

        <div>

            <span class="label">
                EVALUACIÓN CLÍNICA
            </span>

            <h3>
                {resultado.enfermedad}
            </h3>

        </div>


        <div
            class="severity {obtenerClase(resultado.gravedad)}">

            {resultado.gravedad}

        </div>

    </div>



    <!-- PORCENTAJE -->

    <div class="risk-content">


        <div class="percentage">

            <strong>
                {resultado.porcentaje}%
            </strong>

            <span>
                indicador de riesgo
            </span>

        </div>


        <div class="progress-container">

            <div class="progress-background">

                <div
                    class="progress"
                    style={`width:${resultado.porcentaje}%`}>
                </div>

            </div>

        </div>


    </div>



    <!-- INFORMACIÓN -->

    <div class="risk-info">


        <div>

            <span>Puntuación</span>

            <strong>
                {resultado.puntuacion}
                /
                {resultado.puntuacionMaxima}
            </strong>

        </div>


        <div>

            <span>Prioridad</span>

            <strong>
                {resultado.prioridad}
            </strong>

        </div>


        <div>

            <span>Especialista</span>

            <strong>
                {resultado.requiereEspecialista
                    ? "Recomendado"
                    : "No necesario"}
            </strong>

        </div>


    </div>



    <!-- ALERTA -->

    {#if resultado.requiereEspecialista}

        <div class="specialist-alert">

            <span>⚠</span>

            <div>

                <strong>
                    Se recomienda valoración médica
                </strong>

                <p>
                    Considera consultar con
                    {resultado.especialista}.
                </p>

            </div>

        </div>

    {/if}



    <!-- FACTORES -->

    {#if resultado.factores.length > 0}

        <div class="factors">

            <h4>
                Factores detectados
            </h4>


            <ul>

                {#each resultado.factores.slice(0, 4) as factor}

                    <li>
                        {factor}
                    </li>

                {/each}

            </ul>

        </div>

    {/if}


</div>

{:else}

<div class="risk-card empty">

    <div class="empty-icon">
        ◌
    </div>

    <h3>
        Evaluación pendiente
    </h3>

    <p>
        Completa tu información para obtener
        una evaluación clínica.
    </p>

</div>

{/if}



<style>

.risk-card {

    padding: 24px;

    border-radius: 20px;

    background:
        linear-gradient(
            145deg,
            rgba(30,30,28,.95),
            rgba(8,8,8,.95)
        );

    border:
        1px solid rgba(255,215,90,.20);

    box-shadow:
        0 0 25px rgba(255,215,90,.08);

    color: white;

}


/* HEADER */

.risk-header {

    display: flex;

    justify-content: space-between;

    align-items: flex-start;

    gap: 15px;

}


.label {

    font-size: 10px;

    letter-spacing: 1.5px;

    color: #888;

}


.risk-header h3 {

    margin: 5px 0 0;

    font-size: 19px;

    color: #f1f1f1;

}


/* GRAVEDAD */

.severity {

    padding: 6px 12px;

    border-radius: 20px;

    font-size: 11px;

    font-weight: bold;

}


/* COLORES DE ESTADO */

.normal {

    color: #8be28b;

    background: rgba(80,200,80,.12);

}


.precaucion {

    color: #f7d45c;

    background: rgba(255,215,80,.12);

}


.moderado {

    color: #ffb45c;

    background: rgba(255,150,50,.12);

}


.alto {

    color: #ff7575;

    background: rgba(255,60,60,.12);

}


.muy-alto {

    color: #ff4c4c;

    background: rgba(255,30,30,.15);

}


/* PORCENTAJE */

.risk-content {

    margin-top: 25px;

}


.percentage {

    display: flex;

    align-items: baseline;

    gap: 8px;

}


.percentage strong {

    font-size: 38px;

    color: #f7d45c;

}


.percentage span {

    font-size: 12px;

    color: #888;

}


/* BARRA */

.progress-container {

    margin-top: 12px;

}


.progress-background {

    width: 100%;

    height: 7px;

    background: rgba(255,255,255,.08);

    border-radius: 20px;

    overflow: hidden;

}


.progress {

    height: 100%;

    border-radius: 20px;

    background:

        linear-gradient(
            90deg,
            #b6955c,
            #f7d45c
        );

    transition:
        width .8s ease;

}


/* INFO */

.risk-info {

    display: grid;

    grid-template-columns:
        repeat(3,1fr);

    gap: 10px;

    margin-top: 25px;

    padding-top: 20px;

    border-top:
        1px solid rgba(255,255,255,.08);

}


.risk-info div {

    display: flex;

    flex-direction: column;

    gap: 5px;

}


.risk-info span {

    font-size: 10px;

    color: #777;

}


.risk-info strong {

    font-size: 13px;

    color: #ddd;

}


/* ALERTA */

.specialist-alert {

    display: flex;

    gap: 12px;

    margin-top: 20px;

    padding: 13px;

    border-radius: 12px;

    background:
        rgba(255,100,80,.08);

    border:
        1px solid rgba(255,100,80,.18);

}


.specialist-alert > span {

    font-size: 20px;

    color: #ff7777;

}


.specialist-alert strong {

    font-size: 12px;

    color: #ff9999;

}


.specialist-alert p {

    margin: 4px 0 0;

    font-size: 11px;

    color: #999;

}


/* FACTORES */

.factors {

    margin-top: 20px;

}


.factors h4 {

    margin: 0 0 10px;

    font-size: 13px;

    color: #ccc;

}


.factors ul {

    margin: 0;

    padding-left: 18px;

    color: #999;

    font-size: 12px;

}


.factors li {

    margin-bottom: 5px;

}


/* VACÍO */

.empty {

    text-align: center;

    padding: 40px 20px;

}


.empty-icon {

    font-size: 40px;

    color: #b6955c;

}


.empty h3 {

    color: #ddd;

}


.empty p {

    color: #888;

    font-size: 13px;

}


/* RESPONSIVE */

@media(max-width:600px) {

    .risk-info {

        grid-template-columns: 1fr;

    }

}

</style>