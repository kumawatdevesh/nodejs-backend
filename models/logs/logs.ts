import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, { timestamps: true })

const model = mongoose.model('query', Schema)

export default model