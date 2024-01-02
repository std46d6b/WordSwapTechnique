import mongoose from 'mongoose'

const langsScheme = new mongoose.Schema(
	{
		creator: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
		public: { type: Boolean, default: false },
		name: { type: String, required: true },
		code: { type: String, required: true },
		emoji: { type: String, required: false },
		active: { type: Boolean, default: true }
	},
	{
		timestamps: true
	}
)

// id id key
// creator id
// public bool
// name string
// code string
// emoji string

export default mongoose.model('langs', langsScheme)
