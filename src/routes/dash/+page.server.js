import userModel from '$lib/db/models/users'
import wordPairsModel from '$lib/db/models/wordPairs'
import { decodedUserStore } from '$lib/store/user'
import { ObjectId } from 'mongodb'
import { get } from 'svelte/store'

/** @type {import('./$types').Actions} */
export const actions = {
	addWordPair: async ({ cookies, request }) => {
		const data = await request.formData()

		const homeWord = data.get('home')
		const goalWord = data.get('goal')

		if (!(homeWord?.length || goalWord?.length)) {
			return { success: false, comment: 'at least one field must be filled in' }
		}

		let decoded = get(decodedUserStore).user
		if (!decoded?._id) {
			return { success: false, comment: 'invalid decoded' }
		}

		let userId = new ObjectId(decoded._id)
		if (!userId) {
			return { success: false, comment: 'invalid userId, authentication expired' }
		}
		let dbUser = await userModel.findOne({ _id: userId, active: true })
		if (!dbUser) {
			return { success: false, comment: 'autentification failed, try to log in again' }
		}

		let wordPairDoc = new wordPairsModel({
			langPair: dbUser.selectedLanguagePair,
			homeLangWord: homeWord,
			goalLangWord: goalWord,
		})

		await wordPairDoc.save()

		return { success: true, comment: 'autentification failed, try to log in again' }
	}
}
