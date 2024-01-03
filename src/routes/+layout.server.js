import jwt from 'jsonwebtoken'
import { JWT_TOKEN } from '$env/static/private'
import { decodedUserStore } from '$lib/store/user'

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	let token = cookies.get('sst')
	if (!token) {
		return { rfunc: 'LayoutServerLoad', auth: false, comment: 'no token' }
	}
	try {
		let decoded = jwt.verify(token.toString(), JWT_TOKEN)

		if (!decoded) {
			return { rfunc: 'LayoutServerLoad', auth: false, comment: 'no decoded' }
		}

		decodedUserStore.update((currentState) => {
			return { ...currentState, user: decoded }
		})

		return {
			rfunc: 'LayoutServerLoad',
			auth: true,
			comment: 'ok',
			userData: decoded
		}
	} catch (error) {
		if (error?.message === 'jwt expired') {
			return { rfunc: 'LayoutServerLoad', auth: false, comment: 'expired' }
		}
		console.error(error)
		return { rfunc: 'LayoutServerLoad', auth: false, comment: 'server side error' }
	}
}
