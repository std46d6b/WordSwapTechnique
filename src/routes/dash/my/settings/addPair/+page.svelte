<script>
	import { enhance } from '$app/forms'

	/** @type {import('./$types').ActionData} */
	export let form
</script>

<a href="/">root</a>
<a href="/dash">dash</a>
<a href="/dash/my">my</a>
<a href="/dash/my/settings">settings</a>
<br />

<div>/dash/my/settings/addPair</div>

<form method="POST" use:enhance>
	{#if !form?.success && form}
		<div class="info">{form?.comment}</div>
	{:else if form?.success}
		<div class="info">Добавлено</div>
	{/if}
	<div class="group">
		Родной язык
		<label>
			Название
			<input name="homeName" type="text" placeholder="English" />
		</label>
		<label>
			Сокащение
			<input name="homeCode" type="text" placeholder="en" />
		</label>
		<label>
			Emoji
			<input name="homeEmoji" type="text" placeholder="🇬🇧" />
		</label>
	</div>
	<div class="group">
		Изучаемый язык
		<label>
			Название
			<input name="goalName" type="text" placeholder="English" />
		</label>
		<label>
			Сокащение
			<input name="goalCode" type="text" placeholder="en" />
		</label>
		<label>
			Emoji
			<input name="goalEmoji" type="text" placeholder="🇬🇧" />
		</label>
	</div>

	<div class="buttons">
		<button formaction="?/addPair">Добавить</button>
	</div>
</form>
