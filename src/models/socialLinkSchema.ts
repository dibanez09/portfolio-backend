import mongoose from "mongoose";

const Schema = mongoose.Schema

export const socialLinkSchema = new Schema({
    facebook: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    github: {
        type: String,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });