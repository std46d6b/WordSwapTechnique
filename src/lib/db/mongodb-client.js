import mongoose from 'mongoose'
import { DB_URI } from '$env/static/private'

export default function connect() {
	mongoose
		.connect(DB_URI)
		.then(() => {
			console.log('[ + ] db')
		})
		.catch(() => {
			console.log('[ - ] db')
		})
}
