<script>
	import { enhance } from '$app/forms'
	/** @type {import('./$types').PageData} */
	export let data
</script>

<form method="POST" use:enhance>
	{#if data.auth}
		<div class="warn">Вы хотите выйти?</div>
		<div class="buttons">
			<button formaction="?/cancel" class="good">Отмена</button>
			<button formaction="?/out" class="bad">Выход</button>
		</div>
	{:else}
		<div class="warn">Вы ещё не вошли в аккаунт</div>
	{/if}
</form>

<style>
	form {
		position: absolute;
		top: 50vh;
		left: 50vw;
		transform: translate(-50%, -50%);
		width: 100%;
		max-width: 300px;
		padding: 25px;
		border: 1px solid #888;
		border-radius: 15px;
	}

	div.warn {
		font-size: 25px;
		font-weight: 600;
	}

	div.buttons {
		justify-content: space-between;
		margin: 10px 0 0;
		display: flex;
	}

	button {
		border: none;
		border-radius: 5px;
		padding: 5px 15px;
		width: calc(50% - 5px);
	}

	button.good {
		background: #888;
		color: #fff;
	}

	button.bad {
		background: #f00;
		color: #fff;
	}
</style>
