<script>
	/** @type {import('./$types').LayoutData} */
	export let data
</script>

<a href="/">root</a>
<a href="/dash">dash</a>
<a href="/dash/my/settings">settings</a>
<br />

<div>/dash/my</div>

<div class="info">
	<span class="info">{data.selectedLanguagePair.goalLang.emoji}</span>
	<span class="info">{data.selectedLanguagePair.homeLang.emoji}</span>
</div>

<div class="cards">
	{#each data.wordPairs as wordPair}
		<div class="card">
			<span class="word">{wordPair.goalLangWord}</span>
			<span class="word">{wordPair.homeLangWord}</span>
		</div>
	{/each}
</div>
