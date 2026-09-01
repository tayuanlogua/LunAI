<script lang="ts">
    import StartsBackground from "$lib/components/StartsBackground.svelte";

   
   let email = $state('');

	function recoverPassword() {
		if (!email.trim()) {
			alert('Ingresa tu correo.');
			return;
		}

		alert(`Se enviará un enlace a ${email}`);
	}

</script>
<StartsBackground/>
<svelte:head>
	<title>Recuperar contraseña</title>
</svelte:head>


<div class="page">

	<p class="hero">
		Conecta con tu ciclo. Transforma tu vida.
	</p>

	<section class="card">

		<h1>Recupera tu contraseña</h1>

		<p class="description">
			Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
		</p>

		<form on:submit|preventDefault={recoverPassword}>

			<input
				type="email"
				bind:value={email}
				placeholder="Correo electrónico"
			/>

			<button>
				Enviar enlace de recuperación
			</button>

		</form>

		<footer>

			<a href="/">
				Volver a iniciar sesión
			</a>

			<a href="/registro">
				Crear cuenta
			</a>

		</footer>

	</section>

	<p class="bottom">
		Luna • Ciclo • Transformación
	</p>

</div>

<style>
:global(body){
	margin:0;
	background:#050505;
	font-family:Inter,system-ui,sans-serif;
	color:white;
}

.page{
	min-height:100svh;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	padding:2rem;
}

.hero{
	font-family:Georgia,serif;
	font-size:clamp(1.2rem,1.8vw,2rem);
	margin-bottom:2rem;
	color:#dcdcdc;
}

.card{

	width:min(400px,92vw);

	padding:2rem 2.5rem;

	background:#111;

	border-radius:30px;

	border:1px solid rgba(231,190,64,.18);

	box-shadow:
	0 0 40px rgba(255,196,0,.05),
	inset 0 0 20px rgba(255,196,0,.02);

}

h1{

	margin:0 0 .8rem;
	font-size:clamp(1.5rem,2vw,3rem);
	font-weight:800;

}

.description{

	color:#a8a8a8;

	font-size:1.1rem;

	line-height:1.5;

	margin-bottom:1.5rem;

}

input{

	width:90%;

	height:50px;

	padding:0 1.5rem;

	border:none;

	border-radius:18px;

	font-size:1.15rem;

	margin-bottom:1.3rem;

	outline:none;

}

button{

	width:100%;

	height:50px;

	border:none;

	border-radius:35px;

	cursor:pointer;

	font-size:1.2rem;

	font-weight:700;

	background:linear-gradient(#F6D45D,#E3BC3B);

	color:#111;

	box-shadow:0 0 30px rgba(255,213,79,.35);

	transition:.25s;

}

button:hover{

	transform:translateY(-2px);

	box-shadow:0 0 45px rgba(255,213,79,.55);

}

footer{

	display:flex;

	justify-content:space-between;

	margin-top:2rem;

}

footer a{

	color:#caa52a;

	text-decoration:none;

	font-size:1rem;

}

.bottom{

	margin-top:2rem;

	color:#5f5f5f;

	font-size:.95rem;

}

@media (max-width:640px){

	.card{

		padding:1.8rem;

		border-radius:24px;

	}

	input{

		height:58px;

	}

	button{

		height:62px;

	}

	.description{

		font-size:1rem;

	}
}
</style>