<script>
	/** @type {import('./$types').LayoutData} */
	export let data

	let languagePairs = data.langPairs
	let selectedLanguagePairId = data.selectedLanguagePair._id

	$: selectedLanguagePair = languagePairs.find((pair) => pair._id === selectedLanguagePairId)

	let updateLang = async (langPairId) => {
		try {
			const response = await fetch('/dash/my/settings', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ langPairId })
			})

			if (!response.ok) {
				throw new Error('Server responded with an error!')
			}

			const responseData = await response.json()

			selectedLanguagePairId = langPairId
		} catch (error) {
			console.error('Error updating language pair:', error)
		}
	}
</script>

<a href="/">root</a>
<a href="/dash">dash</a>
<a href="/dash/my">my</a>
<br />

<div>/dash/my/settings</div>

email: {data.userData?.email}
{#if data.userData?.admin}
	admin: true
{/if}

<div class="lags">
	{#each languagePairs as langPair}
		<div
			class="pair{selectedLanguagePair?._id === langPair._id ? ' selected' : ''}"
			on:click={() => updateLang(langPair._id)}
			on:keydown={(e) => e.key === 'Enter' && updateLang(langPair._id)}
			id={langPair._id}
			tabindex="0"
			role="button"
		>
			<div class="line">
				<span>родной язык</span>
				<span>{langPair.homeLang.emoji}</span>
				<span>{langPair.homeLang.name}</span>
			</div>
			<div class="line">
				<span>изучаемый язык</span>
				<span>{langPair.goalLang.emoji}</span>
				<span>{langPair.goalLang.name}</span>
			</div>
		</div>
	{/each}
	<a class="addPair" href="/dash/my/settings/addPair">+</a>
</div>

<style>
	div.pair {
		margin: 10px 0;
		cursor: pointer;
	}

	div.line span {
		margin-right: 10px;
	}

	div.selected {
		border: 1px solid;
	}
</style>
