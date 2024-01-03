import wordPairsModel from '$lib/db/models/wordPairs'
import { decodedUserStore } from '$lib/store/user'
import { get } from 'svelte/store'

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	let decoded = get(decodedUserStore)
	if (!decoded?.user?._id) {
		return { func: 'PageServerLoad', success: false, comment: 'invalid decoded' }
	}

	let wordPairs = (
		await wordPairsModel.find(
			{ active: true, langPair: decoded.selectedLanguagePair._id },
			'homeLangWord goalLangWord'
		)
	).reverse()

	// console.log('wordPairs', wordPairs)

	let mappedWordPairs = wordPairs.map(({ _id, homeLangWord, goalLangWord }) => ({
		_id: _id.toString(),
		homeLangWord,
		goalLangWord
	}))

	return { func: 'PageServerLoad', success: true, comment: 'ok', wordPairs: mappedWordPairs }
}
