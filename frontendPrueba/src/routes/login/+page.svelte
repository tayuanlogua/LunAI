<script lang="ts">
    import { goto } from '$app/navigation';
   
    import logo from '$lib/img/lunaIA.png';
    import './login.css';

    let correo = $state('');
    let password = $state('');
    let mostrarPassword = $state(false);

    function login() {

        if (!correo || !password) {

            alert('Completa todos los campos');
            return;
        }

        alert('Inicio de sesión');

        // goto('/dashboard');
    }

    function crearCuenta() {
        goto('/registro');
    }

    function recuperarPassword() {
        goto('/RecuperarContraseña');
    }

    const stars = Array.from({ length: 1000 }, () => {

        const r = Math.random();

        return {

            left: Math.random() * 100,

            top: Math.random() * 100,

            size:

                r < .75
                    ? 'small'
                    : r < .95
                    ? 'medium'
                    : 'big',

            animation:

                Math.random() < .65
                    ? 'twinkle'
                    : 'float',

            duration:

                Math.random() < .65
                    ? `${2 + Math.random() * 4}s`
                    : `${20 + Math.random() * 40}s`,

            delay: `${Math.random() * 5}s`
        };

    });
</script>

<div class="background">

    <div id="stars">

      

    </div>
{#each stars as star}
    <div
        class={`star ${star.size} ${star.animation}`}
        style:left={`${star.left}%`}
        style:top={`${star.top}%`}
        style:animation-duration={star.duration}
        style:animation-delay={star.delay}
    ></div>
{/each}
</div>

<div class="login-container">

    <div class="logo">

        <img
            src={logo}
            alt="Logo">

    </div>

    <p class="subtitle">

        Conecta con tu ciclo. Transforma tu vida.

    </p>

    <div class="login-card">

        <div class="input-group">

            <i class="fa-solid fa-envelope"></i>

            <input

                bind:value={correo}

                type="email"

                placeholder="Correo electrónico">

        </div>

      <div class="input-group">

    <!-- Icono del candado -->
    <i class="fa-solid fa-lock"></i>

    <!-- Input de contraseña -->
    <input
        bind:value={password}
        type={mostrarPassword ? "text" : "password"}
        placeholder="Contraseña">

    <!-- Botón para mostrar/ocultar contraseña -->
    <button
        type="button"
        class="eye-button"
        aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        onclick={() => mostrarPassword = !mostrarPassword}>
        {#if mostrarPassword}
            🙈
        {:else}
            👁️
        {/if}
    </button>

  

</div>

        <div class="links">

            <button
                class="link"
                onclick={recuperarPassword}>

                ¿Olvidaste tu contraseña?

            </button>

            <button
                class="link"
                onclick={crearCuenta}>

                Crear cuenta

            </button>

        </div>

        <button
            class="loginButton"
            onclick={login}>

            Iniciar sesión

        </button>

    </div>

</div>