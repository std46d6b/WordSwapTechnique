import mongoose from 'mongoose'

const wordPairsScheme = new mongoose.Schema(
	{
		langPair: { type: mongoose.Schema.Types.ObjectId, ref: 'langPairs', required: true },
		homeLangWord: { type: String, required: false, default: '' },
		goalLangWord: { type: String, required: false, default: '' },
		active: { type: Boolean, default: true }
	},
	{
		timestamps: true
	}
)

// id id key
// langPair id
// homeLangWord string
// goalLangWord string
// active bool

export default mongoose.model('wordPairs', wordPairsScheme)
