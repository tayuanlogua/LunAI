<script lang="ts">

    import { goto } from "$app/navigation";

    import NotificationBell from "./NotificationBell.svelte";

    let nombre="Cristina";

    function perfil(){

        goto("/perfil");

    }

    function configuracion(){

        goto("/configuracion");

    }

</script>

<header>

    <input

        placeholder="Buscar..."

        class="search">

    <div class="right">

        <NotificationBell cantidad={3}/>

        <button

            class="icon"

            onclick={configuracion}>

            ⚙️

        </button>

        <button

            class="profile"

            onclick={perfil}>

            <img

            src="https://i.pravatar.cc/100">

            <div>

                <span>

                    Bienvenida

                </span>

                <strong>

                    {nombre}

                </strong>

            </div>

        </button>

    </div>

</header>

<style>

header{

    display:flex;

    justify-content:space-between;

    align-items:center;

    padding:20px 35px;

    background:#101010;

    border-bottom:1px solid rgba(255,255,255,.08);

}

.search{

    width:350px;

    height:45px;

    border:none;

    border-radius:14px;

    background:#191919;

    color:white;

    padding:0 20px;

}

.right{

    display:flex;

    gap:18px;

    align-items:center;

}

.icon{

    width:45px;

    height:45px;

    border:none;

    border-radius:50%;

    cursor:pointer;

    background:#191919;

    color:white;

}

.profile{

    display:flex;

    gap:12px;

    align-items:center;

    border:none;

    background:none;

    cursor:pointer;

    color:white;

}

.profile img{

    width:45px;

    height:45px;

    border-radius:50%;

}

.profile span{

    color:#999;

    font-size:12px;

}

.profile strong{

    display:block;

}

</style>