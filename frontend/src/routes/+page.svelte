<script lang="ts">
    import { goto } from '$app/navigation';
    import logo from '$lib/img/lunaIA.png';
    import './login.css';
    import StartsBackground from '$lib/components/StartsBackground.svelte';

    let correo = $state('');
    let password = $state('');
    let mostrarPassword = $state(false);

    async function login() {
        if (!correo.trim() || !password) {
            alert('Completa todos los campos');
            return;
        }

        try {
            const respuesta = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo: correo.trim(),
                    contrasena: password
                })
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                alert(datos.message || 'Correo o contraseña incorrectos');
                return;
            }

            localStorage.setItem('token', datos.token);
            localStorage.setItem('usuario', JSON.stringify(datos.usuario));
            await goto('/DashboardUser');
        } catch (error) {
            console.error(error);
            alert('No fue posible conectar con el servidor');
        }
    }

    function crearCuenta() {
        goto('/registro');
    }

    function recuperarPassword() {
        goto('/RecuperarContraseña');
    }

</script>


<StartsBackground/>
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
