import jwt from 'jsonwebtoken'
import { JWT_TOKEN } from '$env/static/private'
import { decodedUserStore } from '$lib/store/user'
import { get } from 'svelte/store'
import { redirect } from '@sveltejs/kit'
import userModel from '$lib/db/models/users'
import { ObjectId } from 'mongodb'

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	let token = cookies.get('sst')
	if (!token) {
		return { rfunc: 'LayoutServerLoad', auth: false, comment: 'no token' }
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

		decodedUserStore.update((currentState) => {
			return {
				...currentState,
				user: decoded,
				selectedLanguagePair: dbUser.selectedLanguagePair?.toString()
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
		// @ts-ignore
		if (error.message === 'jwt expired') {
			return { rfunc: 'LayoutServerLoad', auth: false, comment: 'expired' }
		}
		console.log(error)
		return { rfunc: 'LayoutServerLoad', auth: false, comment: 'server side error' }
	}
}
