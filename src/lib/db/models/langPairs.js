import mongoose from 'mongoose'

const langPairsScheme = new mongoose.Schema(
	{
		owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
		homeLang: { type: mongoose.Schema.Types.ObjectId, ref: 'langs', required: true },
		goalLang: { type: mongoose.Schema.Types.ObjectId, ref: 'langs', required: true },
		active: { type: Boolean, default: true }
	},
	{
		timestamps: true
	}
)

// id id key
// owner id
// homeLang id
// goalLang id

export default mongoose.model('langPairs', langPairsScheme)
