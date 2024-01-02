<script>
    import { enhance } from "$app/forms"

    /** @type {import('./$types').LayoutData} */
    export let data;

    // console.log(data)

    let languagePairs = data.langPairs
    let selectedLanguagePairId = data.selectedLanguagePair

    $: selectedLanguagePair = languagePairs.find(pair => pair._id === selectedLanguagePairId)

    let updateLang = async (langPairId) => {
        try {
            let oldId = data.selectedLanguagePair
            const response = await fetch('/dash/my/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ langPairId }),
            })

            if (!response.ok) {
                throw new Error('Server responded with an error!');
            }

            selectedLanguagePairId = langPairId
            
            console.log('Language pair updated successfully');
        } catch (error) {
            console.error('Error updating language pair:', error);
        }
    }
</script>

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

<a href="/">root</a>
<a href="/dash">dash</a>
<br>

<div>/dash/my/settings</div>

email: {data.userData?.email}
{#if data.userData?.admin }
    admin: true
{/if}

<div class="lags">
    {#each languagePairs as langPair}
        <div class="pair{selectedLanguagePair?._id === langPair._id ? ' selected' : ''}" on:click={() => updateLang(langPair._id)} id={langPair._id}>
            <div class="line"><span>родной язык</span><span>{langPair.homeLang.emoji}</span><span>{langPair.homeLang.name}</span></div>
            <div class="line"><span>изучаемый язык</span><span>{langPair.goalLang.emoji}</span><span>{langPair.goalLang.name}</span></div>
        </div>
    {/each}
    <a class="addPair" href="/dash/my/settings/addPair">+</a>
</div>
