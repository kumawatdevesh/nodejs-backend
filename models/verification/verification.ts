import mongoose, { Document } from 'mongoose'

interface VerificationType {
    verified: boolean;
    resource: any;
    type: string;
    request: string;
    resourceId: string;
}

const Schema = new mongoose.Schema({
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    resource: {
        type: mongoose.Schema.Types.Mixed
    },
    type: {
        type: String,
        required: true
    },
    request: {
        type: String,
        required: true
    },
    resourceId: {
        type: String
    }
})

const model = mongoose.model<VerificationType & Document>('verification', Schema)

export default model