<script>
	import { enhance } from '$app/forms'

	/** @type {import('./$types').ActionData} */
	export let form

	/** @type {import('./$types').LayoutData} */
	export let data
</script>

<a href="/">root</a>
<a href="/dash/my">my</a>

<form method="POST" use:enhance>
	{#if !form?.success && form}
		<div class="info">{form?.comment}</div>
	{:else if form?.success}
		<div class="info">Добавлено</div>
	{/if}

	<textarea name="home" id="home" cols="30" rows="10" placeholder={data.selectedLanguagePair?.homeLang.emoji}></textarea>
	<textarea name="goal" id="goal" cols="30" rows="10" placeholder={data.selectedLanguagePair?.goalLang.emoji}></textarea>
	<button formaction="?/addWordPair">add</button>
</form>
