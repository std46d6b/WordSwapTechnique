import mongoose from 'mongoose'

const userScheme = new mongoose.Schema(
  {
    name:                 { type: String, required: false },
    email:                { type: String, required: true, unique: true },
    passwordHash:         { type: String, required: true },
    active:               { type: Boolean, default: true },
    admin:                { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

// id id key
// name string
// email string
// passwordHash string
// active bool
// admin bool
// selectedLanguagePair id

export default mongoose.model('users', userScheme)
