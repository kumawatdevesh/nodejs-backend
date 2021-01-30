import mongoose, { Document } from 'mongoose'

interface TweetType {
    title: string;
    description: string;
    createdBy: string;
    favorited: boolean
}

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    favorited: {
        type: Boolean,
        default: false
    }
})

const model = mongoose.model<TweetType & Document>('tweet', Schema)

export default model