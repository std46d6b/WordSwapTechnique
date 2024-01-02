import userModel from '$lib/db/models/users'
import langPairsModel from '$lib/db/models/langPairs'
import langsModel from '$lib/db/models/langs'
import { redirect } from '@sveltejs/kit'
import { ObjectId } from 'mongodb'
import { get } from 'svelte/store'
import { decodedUserStore } from '$lib/store/user'

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    return { func: 'PageServerLoad', ra: (cookies.get('ra')) ? true : false }
}

/** @type {import('./$types').Actions} */
export const actions = {
    addPair: async ({ cookies, request }) => {
        const data = await request.formData()

        let decoded = get(decodedUserStore).user
        if (!decoded?._id) { return { func: 'Actions', success: false, comment: 'invalid decoded' } }

        let homeName = data.get('homeName')
        let homeCode = data.get('homeCode')
        let homeEmoji = data.get('homeEmoji')
        let goalName = data.get('goalName')
        let goalCode = data.get('goalCode')
        let goalEmoji = data.get('goalEmoji')

        if (!homeName?.length) { return { success: false, comment: 'invalid homeName' } }
        if (!homeCode?.length) { return { success: false, comment: 'invalid homeCode' } }
        if (!homeEmoji?.length) { return { success: false, comment: 'invalid homeEmoji' } }
        if (!goalName?.length) { return { success: false, comment: 'invalid goalName' } }
        if (!goalCode?.length) { return { success: false, comment: 'invalid goalCode' } }
        if (!goalEmoji?.length) { return { success: false, comment: 'invalid goalEmoji' } }


        let userId = new ObjectId(decoded._id)
        if (!userId) {return { success: false, comment: 'invalid userId, authentication expired' }}
        let dbUser = await userModel.findOne({ _id: userId, active: true })
        if (!dbUser) {return { success: false, comment: 'autentification failed, try to log in again' }}

        let homeDoc = new langsModel({
            creator: dbUser,
            name: homeName,
            code: homeCode,
            emoji: homeEmoji
        })
        let gaolDoc = new langsModel({
            creator: dbUser,
            name: goalName,
            code: goalCode,
            emoji: goalEmoji
        })

        let dbHomeItem = await homeDoc.save()
        let dbGoalItem = await gaolDoc.save()

        let langPairDoc = new langPairsModel({
            owner: dbUser,
            homeLang: dbHomeItem,
            goalLang: dbGoalItem
        })

        let dbLangPairItem = await langPairDoc.save()

        dbUser.selectedLanguagePair = dbLangPairItem;
        await dbUser.save();

        decodedUserStore.update(currentState => {
            return {...currentState, selectedLanguagePair: dbLangPairItem._id.toString() }
        })

        throw redirect(302, '/dash/my/settings')
    }
}
