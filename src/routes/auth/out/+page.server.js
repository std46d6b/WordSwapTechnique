import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    let authStatus = (cookies.get('sst')) ? true : false

    if (!authStatus) { throw redirect(302, '/') }
    return { func: 'PageServerLoad', auth: authStatus, comment: (authStatus) ? 'ok' : 'no token' }
}

/** @type {import('./$types').Actions} */
export const actions = {
    out: async ({ cookies }) => {
        cookies.delete('sst', { path: '/' })
        throw redirect(302, '/')
    },
    cancel: async () => {
        throw redirect(302, '/')
    }
}
