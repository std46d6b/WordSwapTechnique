import { writable } from 'svelte/store'

export let decodedUserStore = writable({
	selectedLanguagePair: {
		_id: null,
		homeLang: {
			name: null,
			code: null,
			emoji: null
		},
		goalLang: {
			name: null,
			code: null,
			emoji: null
		}
	},
	lol: 'kek'
})
