<script lang="ts">

    interface Props {
        titulo?: string;
        subtitulo?: string;
    }

    let {
        titulo = "Dashboard",
        subtitulo = "Bienvenida nuevamente a LunAI"
    }: Props = $props();

</script>


<header class="header">

    <div class="header-text">

        <h1>{titulo}</h1>

        <p>{subtitulo}</p>

    </div>


    <div class="header-date">

        <span class="date-icon">◷</span>

        <div>
            <small>Hoy</small>

            <strong>
                {new Date().toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "long"
                })}
            </strong>
        </div>

    </div>

</header>


<style>

.header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 30px 35px 20px;

    color: white;

}


.header-text h1 {

    margin: 0;

    font-size: 30px;

    font-weight: 600;

    color: #f7d45c;

}


.header-text p {

    margin: 6px 0 0;

    color: #aaa;

    font-size: 14px;

}


.header-date {

    display: flex;

    align-items: center;

    gap: 10px;

    padding: 10px 15px;

    border-radius: 12px;

    background: rgba(255,255,255,.05);

    border: 1px solid rgba(255,215,90,.15);

}


.date-icon {

    font-size: 25px;

    color: #f7d45c;

}


.header-date small {

    display: block;

    color: #888;

    font-size: 11px;

}


.header-date strong {

    display: block;

    color: #ddd;

    font-size: 13px;

    font-weight: 500;

}


@media(max-width:700px) {

    .header {

        padding: 20px;

    }

    .header-date {

        display: none;

    }

}

</style>