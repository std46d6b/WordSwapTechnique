import jwt from 'jsonwebtoken'
import { JWT_TOKEN } from '$env/static/private'
import { decodedUserStore } from '$lib/store/user'
import { get } from 'svelte/store'
import { redirect } from '@sveltejs/kit'
import userModel from '$lib/db/models/users'
import langPairsModel from '$lib/db/models/langPairs'
import langsModel from '$lib/db/models/langs'
import { ObjectId } from 'mongodb'

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	let token = cookies.get('sst')
	if (!token) {
		throw redirect(302, '/auth')
	}
	try {
		let decoded = jwt.verify(token.toString(), JWT_TOKEN)

		if (!decoded) {
			throw redirect(302, '/auth')
		}

		let userId = new ObjectId(decoded._id)
		if (!userId) {
			throw redirect(302, '/auth')
		}
		let dbUser = await userModel.findOne({ _id: userId, active: true })
		if (!dbUser) {
			throw redirect(302, '/auth')
		}

		let langPair = await langPairsModel
			.findOne(
				{ active: true, owner: userId, _id: dbUser.selectedLanguagePair },
				'homeLang goalLang'
			)
			.populate({
				path: 'homeLang',
				select: 'name code emoji'
			})
			.populate({
				path: 'goalLang',
				select: 'name code emoji'
			})

		decodedUserStore.update((currentState) => {
			return {
				...currentState,
				user: decoded,
				selectedLanguagePair: {
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
			}
		})

		return {
			rfunc: 'LayoutServerLoad',
			auth: true,
			comment: 'ok',
			userData: decoded,
			selectedLanguagePair: get(decodedUserStore).selectedLanguagePair
		}
	} catch (error) {
		if (error?.message === 'jwt expired') {
			throw redirect(302, '/auth')
		}
		console.error(error)
		throw redirect(302, '/auth')
	}
}
