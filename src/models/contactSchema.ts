import mongoose from "mongoose";

const Schema = mongoose.Schema

export const contactSchema = new Schema({
    phone: {
        type: String,
        required: true
    },
    secondaryPhone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })