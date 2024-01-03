import { decodedUserStore } from '$lib/store/user'
import { ObjectId } from 'mongodb'
import userModel from '$lib/db/models/users'
import langPairsModel from '$lib/db/models/langPairs'
import { get } from 'svelte/store'

export async function POST({ request, params }) {
	try {
		const { langPairId } = await request.json()

		let decoded = get(decodedUserStore).user
		if (!decoded?._id) {
			return { func: 'Actions', success: false, comment: 'invalid decoded' }
		}

		let userId = new ObjectId(decoded._id)
		if (!userId) {
			return { success: false, comment: 'invalid userId, authentication expired' }
		}
		let dbUser = await userModel.findOneAndUpdate(
			{ _id: userId, active: true },
			{ $set: { selectedLanguagePair: langPairId } },
			{ new: true }
		)
		if (!dbUser) {
			return { success: false, comment: 'autentification failed, try to log in again' }
		}

		let langPair = await langPairsModel
			.findOne({ active: true, owner: dbUser, _id: langPairId }, 'homeLang goalLang')
			.populate({
				path: 'homeLang',
				select: 'name code emoji'
			})
			.populate({
				path: 'goalLang',
				select: 'name code emoji'
			})

		let selectedLanguagePair = {
			_id: langPair?._id.toString(),
			homeLang: {
				name: langPair?.homeLang.name,
				code: langPair?.homeLang.code,
				emoji: langPair?.homeLang.emoji
			},
			goalLang: {
				name: langPair?.goalLang.name,
				code: langPair?.goalLang.code,
				emoji: langPair?.goalLang.emoji
			}
		}

		decodedUserStore.update((currentState) => {
			return { ...currentState, selectedLanguagePair }
		})

		return new Response(
			JSON.stringify({
				comment: 'Language pair updated successfully',
				selectedLanguagePair
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		)
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		})
	}
}
