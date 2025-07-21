import mongoose from "mongoose";

const Schema = mongoose.Schema

export const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },
    addressId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
}, { timestamps: true })