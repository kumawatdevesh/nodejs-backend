import mongoose, { Document } from 'mongoose'

interface UserType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

const Schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const model = mongoose.model<UserType & Document>('user', Schema)

export default model