import { writable } from "svelte/store"

export let decodedUserStore = writable({
    selectedLanguagePair: null,
    lol: 'kek'
})
