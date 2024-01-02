import { ObjectId } from 'mongodb'
import langPairsModel from '$lib/db/models/langPairs'
import langsModel from '$lib/db/models/langs'
import { get } from 'svelte/store'
import { decodedUserStore } from '$lib/store/user'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    let decoded = get(decodedUserStore)

    let langPairs = (
        await langPairsModel.find(
            { active: true, owner: decoded.user._id},
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
    ).reverse()

    let mappedLangPairs = langPairs.map(({ _id, homeLang, goalLang }) => ({
        _id: _id.toString(),
        homeLang: {
            name: homeLang.name,
            code: homeLang.code,
            emoji: homeLang.emoji
        },
        goalLang: {
            name: goalLang.name,
            code: goalLang.code,
            emoji: goalLang.emoji
        }
    }))

    return { type: 'PageServerLoad', success: true, langPairs: mappedLangPairs} // , items: mappedItems, colors: mappedColors, categories: mappedCategories }
}
