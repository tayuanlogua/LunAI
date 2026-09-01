<script lang="ts">
	import CatMascot from './CatMascot.svelte';

	type Role = 'user' | 'assistant';

	type Message = {
		id: string;
		role: Role;
		content: string;
	};

	type AgentResponse = {
		message?: string;
	};

	let {
		apiEndpoint = '/api/agent/chat',
		title = 'LunAI',
		subtitle = 'Tu compañera inteligente',
		greeting = 'Hola ✨ Soy LunAI. Estoy aquí para acompañarte y ayudarte a entender mejor tu ciclo.',
		placeholder = 'Escribe algo para LunAI...'
	}: {
		apiEndpoint?: string;
		title?: string;
		subtitle?: string;
		greeting?: string;
		placeholder?: string;
	} = $props();

	let messages = $state<Message[]>([
		{
			id: crypto.randomUUID(),
			role: 'assistant',
			content: greeting
		}
	]);

	let input = $state('');
	let loading = $state(false);
	let error = $state('');
	let mood = $state<'idle' | 'thinking' | 'happy' | 'listening'>('idle');

	let chatBody: HTMLDivElement;

	let canSend = $derived(input.trim().length > 0 && !loading);

	async function sendMessage() {
		const content = input.trim();

		if (!content || loading) return;

		error = '';

		const userMessage: Message = {
			id: crypto.randomUUID(),
			role: 'user',
			content
		};

		messages = [...messages, userMessage];
		input = '';
		loading = true;
		mood = 'thinking';

		await tick();

		scrollToBottom();

		try {
			const response = await fetch(apiEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					message: content,

					// Aquí puedes mandar contexto adicional de tu dashboard.
					// Por ejemplo:
					// userId,
					// cycleDay,
					// phase,
					// symptoms,
					// etc.
					history: messages.map(({ role, content }) => ({
						role,
						content
					}))
				})
			});

			if (!response.ok) {
				throw new Error(`Agent API error: ${response.status}`);
			}

			const data: AgentResponse = await response.json();

			const assistantMessage: Message = {
				id: crypto.randomUUID(),
				role: 'assistant',
				content:
					data.message ??
					'No pude generar una respuesta en este momento.'
			};

			messages = [...messages, assistantMessage];
			mood = 'happy';
		} catch (err) {
			console.error(err);

			error =
				'No pude conectar con LunAI. Verifica que el servicio del agente esté disponible.';
			mood = 'idle';
		} finally {
			loading = false;

			await tick();

			scrollToBottom();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}

	function scrollToBottom() {
		if (!chatBody) return;

		chatBody.scrollTo({
			top: chatBody.scrollHeight,
			behavior: 'smooth'
		});
	}

	function clearChat() {
		messages = [
			{
				id: crypto.randomUUID(),
				role: 'assistant',
				content: greeting
			}
		];

		error = '';
		mood = 'idle';
	}

	function quickMessage(text: string) {
		input = text;
		sendMessage();
	}

	import { tick } from 'svelte';
</script>

<section class="agent-shell">
	<header class="agent-header">
		<div class="brand">
			<div class="brand-orb">
				<span>☾</span>
			</div>

			<div>
				<h2>{title}</h2>
				<p>{subtitle}</p>
			</div>
		</div>

		<div class="header-actions">
			<span class="online">
				<span class="online-dot"></span>
				En línea
			</span>

			<button
				type="button"
				class="clear-button"
				onclick={clearChat}
				aria-label="Limpiar conversación"
			>
				↻
			</button>
		</div>
	</header>

	<div class="agent-content">
		<aside class="mascot-panel">
			<div class="mascot-glow"></div>

			<CatMascot
				{mood}
				size={300}
			/>

			<div class="mascot-copy">
				<strong>LunAI</strong>

				<span>
					{loading
						? 'Estoy pensando...'
						: mood === 'happy'
							? 'Me alegra ayudarte ✨'
							: 'Estoy aquí contigo'}
				</span>
			</div>
		</aside>

		<div class="conversation">
			<div
				class="messages"
				bind:this={chatBody}
				aria-live="polite"
			>
				{#each messages as message (message.id)}
					<div
						class="message-row"
						class:user-row={message.role === 'user'}
						class:assistant-row={message.role === 'assistant'}
					>
						{#if message.role === 'assistant'}
							<div class="avatar-mini">☾</div>
						{/if}

						<div
							class="message"
							class:assistant-message={message.role === 'assistant'}
							class:user-message={message.role === 'user'}
						>
							{message.content}
						</div>
					</div>
				{/each}

				{#if loading}
					<div class="message-row assistant-row">
						<div class="avatar-mini">☾</div>

						<div class="message assistant-message typing">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
				{/if}
			</div>

			{#if messages.length === 1 && !loading}
				<div class="quick-actions">
					<button
						type="button"
						onclick={() =>
							quickMessage('¿Cómo puedo entender mejor mi ciclo?')}
					>
						Entender mi ciclo
					</button>

					<button
						type="button"
						onclick={() =>
							quickMessage('Quiero registrar cómo me siento hoy.')}
					>
						Registrar cómo me siento
					</button>

					<button
						type="button"
						onclick={() =>
							quickMessage('Dame una recomendación para hoy.')}
					>
						Recomendación para hoy
					</button>
				</div>
			{/if}

			{#if error}
				<div class="error">
					<span>!</span>
					{error}
				</div>
			{/if}

			<form class="composer" onsubmit={(event) => {
				event.preventDefault();
				sendMessage();
			}}>
				<textarea
					bind:value={input}
					onkeydown={handleKeydown}
					placeholder={placeholder}
					rows="1"
					disabled={loading}
					aria-label="Mensaje para LunAI"
				></textarea>

				<button
					type="submit"
					class="send-button"
					disabled={!canSend}
					aria-label="Enviar mensaje"
				>
					➤
				</button>
			</form>

			<p class="disclaimer">
				LunAI puede equivocarse. Para situaciones médicas importantes,
				consulta con un profesional de salud.
			</p>
		</div>
	</div>
</section>

<style>
	.agent-shell {
		position: relative;
		width: 100%;
		min-height: 620px;
		overflow: hidden;

		border: 1px solid rgba(218, 191, 143, 0.24);
		border-radius: 24px;

		background:
			radial-gradient(
				circle at 15% 20%,
				rgba(189, 143, 73, 0.13),
				transparent 28%
			),
			radial-gradient(
				circle at 80% 85%,
				rgba(116, 77, 43, 0.14),
				transparent 30%
			),
			linear-gradient(
				135deg,
				rgba(38, 31, 27, 0.98),
				rgba(18, 17, 16, 0.98)
			);

		box-shadow:
			0 25px 80px rgba(0, 0, 0, 0.3),
			inset 0 1px rgba(255, 255, 255, 0.05);

		color: #f3e7d1;
	}

	.agent-header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 20px 24px;

		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
		background: rgba(20, 18, 17, 0.42);
		backdrop-filter: blur(16px);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 13px;
	}

	.brand-orb {
		width: 42px;
		height: 42px;

		display: grid;
		place-items: center;

		border-radius: 50%;

		background:
			radial-gradient(circle at 35% 30%, #f4d994, #a77839 65%, #5c3d24);

		box-shadow:
			0 0 20px rgba(221, 180, 101, 0.25),
			inset 0 1px rgba(255, 255, 255, 0.5);
	}

	.brand-orb span {
		font-size: 22px;
		color: #fff4db;
	}

	h2 {
		margin: 0;
		font-family: Georgia, serif;
		font-size: 21px;
		font-weight: 500;
	}

	.brand p {
		margin: 3px 0 0;
		color: #a99c8c;
		font-size: 12px;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.online {
		display: flex;
		align-items: center;
		gap: 6px;

		color: #aaa095;
		font-size: 11px;
	}

	.online-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #82a878;
		box-shadow: 0 0 8px #82a878;
	}

	.clear-button {
		width: 32px;
		height: 32px;

		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 50%;

		background: rgba(255, 255, 255, 0.04);
		color: #b9ab9a;

		cursor: pointer;
		transition: 0.2s;
	}

	.clear-button:hover {
		color: #e8c986;
		border-color: rgba(232, 201, 134, 0.3);
	}

	.agent-content {
		display: grid;
		grid-template-columns: 400px minmax(0, 1fr);
		min-height: 535px;
	}

	.mascot-panel {
		position: relative;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		padding: 30px 15px;

		border-right: 1px solid rgba(255, 255, 255, 0.06);

		background:
			radial-gradient(
				circle at 50% 42%,
				rgba(194, 151, 79, 0.1),
				transparent 48%
			);
	}

	.mascot-glow {
		position: absolute;

		width: 140px;
		height: 140px;

		border-radius: 50%;

		background: rgba(214, 171, 91, 0.12);
		filter: blur(40px);

		animation: pulse 4s ease-in-out infinite;
	}

	.mascot-copy {
		position: relative;

		display: flex;
		flex-direction: column;
		align-items: center;

		margin-top: 25px;
		text-align: center;
	}

	.mascot-copy strong {
		font-family: Georgia, serif;
		font-size: 18px;
		color: #e5c889;
	}

	.mascot-copy span {
		margin-top: 5px;
		color: #91877c;
		font-size: 11px;
	}

	.conversation {
		display: flex;
		flex-direction: column;
		min-width: 0;
		padding: 0;
	}

	.messages {
		flex: 1;
		min-height: 0;

		overflow-y: auto;

		padding: 28px;

		scrollbar-width: thin;
		scrollbar-color: #66543d transparent;
	}

	.message-row {
		display: flex;
		align-items: flex-end;
		gap: 9px;

		margin-bottom: 18px;
	}

	.user-row {
		justify-content: flex-end;
	}

	.avatar-mini {
		width: 28px;
		height: 28px;

		display: grid;
		place-items: center;

		flex: 0 0 auto;

		border-radius: 50%;

		background: linear-gradient(135deg, #a98046, #553b26);
		color: #f8eacb;
		font-size: 14px;
	}

	.message {
		max-width: min(75%, 560px);

		padding: 12px 15px;

		border-radius: 16px;

		font-size: 13px;
		line-height: 1.55;
		white-space: pre-wrap;
	}

	.assistant-message {
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-bottom-left-radius: 4px;

		background: rgba(69, 59, 51, 0.68);
		color: #ddd1c2;
	}

	.user-message {
		border-bottom-right-radius: 4px;

		background: linear-gradient(
			135deg,
			rgba(154, 118, 65, 0.85),
			rgba(106, 78, 43, 0.85)
		);

		color: #fff3dc;
	}

	.typing {
		display: flex;
		align-items: center;
		gap: 4px;
		min-width: 54px;
	}

	.typing span {
		width: 5px;
		height: 5px;

		border-radius: 50%;

		background: #cdb277;

		animation: typing 1s infinite ease-in-out;
	}

	.typing span:nth-child(2) {
		animation-delay: 0.15s;
	}

	.typing span:nth-child(3) {
		animation-delay: 0.3s;
	}

	.quick-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;

		padding: 0 28px 15px;
	}

	.quick-actions button {
		padding: 8px 11px;

		border: 1px solid rgba(211, 177, 111, 0.2);
		border-radius: 20px;

		background: rgba(185, 144, 76, 0.07);

		color: #c6ad83;
		font-size: 11px;

		cursor: pointer;
		transition: 0.2s;
	}

	.quick-actions button:hover {
		background: rgba(185, 144, 76, 0.16);
		border-color: rgba(211, 177, 111, 0.4);
	}

	.error {
		display: flex;
		align-items: center;
		gap: 8px;

		margin: 0 28px 10px;
		padding: 9px 12px;

		border: 1px solid rgba(183, 94, 75, 0.3);
		border-radius: 10px;

		background: rgba(183, 94, 75, 0.08);

		color: #cda79a;
		font-size: 11px;
	}

	.error span {
		display: grid;
		place-items: center;

		width: 18px;
		height: 18px;

		border-radius: 50%;
		background: #865244;

		color: white;
	}

	.composer {
		display: flex;
		align-items: flex-end;
		gap: 8px;

		margin: 0 20px;

		padding: 7px 7px 7px 14px;

		border: 1px solid rgba(219, 190, 136, 0.18);
		border-radius: 16px;

		background: rgba(12, 12, 11, 0.55);

		box-shadow: inset 0 1px rgba(255, 255, 255, 0.03);

		transition: 0.2s;
	}

	.composer:focus-within {
		border-color: rgba(219, 190, 136, 0.4);
		box-shadow:
			inset 0 1px rgba(255, 255, 255, 0.03),
			0 0 25px rgba(183, 142, 76, 0.07);
	}

	textarea {
		flex: 1;

		resize: none;

		min-height: 34px;
		max-height: 100px;

		padding: 8px 0;

		border: 0;
		outline: none;

		background: transparent;

		color: #e8ddcf;
		font-family: inherit;
		font-size: 13px;
		line-height: 18px;
	}

	textarea::placeholder {
		color: #706a62;
	}

	.send-button {
		width: 36px;
		height: 36px;

		flex: 0 0 auto;

		border: 0;
		border-radius: 11px;

		background: linear-gradient(135deg, #c6a25f, #88683c);

		color: #201a14;

		font-size: 17px;

		cursor: pointer;

		transition:
			transform 0.2s,
			opacity 0.2s;
	}

	.send-button:hover:not(:disabled) {
		transform: translateY(-1px);
	}

	.send-button:disabled {
		cursor: not-allowed;
		opacity: 0.35;
	}

	.disclaimer {
		margin: 10px 25px 17px;

		color: #625e59;
		font-size: 9px;
		line-height: 1.4;
		text-align: center;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(0.9);
			opacity: 0.55;
		}

		50% {
			transform: scale(1.1);
			opacity: 0.9;
		}
	}

	@keyframes typing {
		0%,
		100% {
			transform: translateY(0);
			opacity: 0.4;
		}

		50% {
			transform: translateY(-3px);
			opacity: 1;
		}
	}

	@media (max-width: 720px) {
		.agent-shell {
			min-height: 650px;
			border-radius: 18px;
		}

		.agent-content {
			grid-template-columns: 1fr;
		}

		.mascot-panel {
			flex-direction: row;
			gap: 15px;
			min-height: 120px;
			padding: 15px;
			border-right: 0;
			border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		}

		.mascot-copy {
			align-items: flex-start;
			margin-top: 0;
		}

		.messages {
			padding: 20px 15px;
		}

		.message {
			max-width: 85%;
		}

		.quick-actions {
			padding-inline: 15px;
		}

		.header-actions .online {
			display: none;
		}
	}
</style>
