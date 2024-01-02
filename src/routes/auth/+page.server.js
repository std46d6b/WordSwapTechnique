import userModel from '$lib/db/models/users'
import { JWT_TOKEN } from '$env/static/private'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { redirect } from '@sveltejs/kit'
import { decodedUserStore } from '$lib/store/user'
import { update } from 'svelte/store'

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    return { func: 'PageServerLoad', ra: (cookies.get('ra')) ? true : false }
}

/** @type {import('./$types').Actions} */
export const actions = {
    reg: async ({ cookies, request }) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')
        const adminCheck = data.get('adminCheck') === 'admin'

        if (!email?.length) { return { success: false, comment: 'invalid email' } }
        if (!password?.length) { return { success: false, comment: 'password is too short' } }
        
        let user = await userModel.findOne({ email: email })

        if (user) { return { success: false, comment: 'email exists' } }
        
        let adminStatus = false
        if (adminCheck) {
            cookies.delete('ra', { path: '/auth' })
            let user = await userModel.findOne({ admin: true })
            if (user) { return { success: false, comment: 'admin exists' } }
            adminStatus = adminCheck
        }

        let salt = await bcrypt.genSalt(10)
        let passHash = await bcrypt.hash(password.toString(), salt)

        let doc = new userModel({
            email: email,
            passwordHash: passHash,
            admin: adminStatus
        })

        let dbUser = await doc.save()

        let token = jwt.sign(
            { _id: dbUser._id, admin: dbUser.admin, email: email },
            JWT_TOKEN,
            { expiresIn: '30d' }
        )

        cookies.set('sst', token, { sameSite: 'strict', path: '/', maxAge: 1000 * 60 * 60 * 24 * 30 })

        throw redirect(302, '/dash/my/settings')  // TODO: to add aditional data form page
    },
    log: async ({ cookies, request }) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')

        if (!email?.length) { return { success: false, comment: 'invalid email' } }
        if (!password?.length) { return { success: false, comment: 'invalid password' } }

        let user = await userModel.findOne({ email: email, active: true })

        if (!user) { return { success: false, comment: 'user not found' } }
        let isPasswordValid = await bcrypt.compare(password.toString(), user.passwordHash)
        if (!isPasswordValid) { return { success: false, comment: 'wrong password' } }

        decodedUserStore.update(currentState => { return { ...currentState, selectedLanguagePair: user.selectedLanguagePair?.toString()  } })

        let token = jwt.sign(
            { _id: user._id, admin: user.admin, email: user.email },
            JWT_TOKEN,
            { expiresIn: '30d' }
        )

        cookies.set('sst', token, { sameSite: 'strict', path: '/', maxAge: 1000 * 60 * 60 * 24 * 30 })
        
        throw redirect(302, (user.admin) ? '/admin' : '/')
    }
}
