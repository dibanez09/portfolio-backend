import mongoose from "mongoose";
import { userSchema } from "./userModel";
import { profileSchema } from "./profileSchema";
import { contactSchema } from "./contactSchema";
import { addressSchema } from "./addressSchema";

export const User = mongoose.model('User', userSchema);
export const Profile = mongoose.model('Profile', profileSchema);
export const Contact = mongoose.model('Contact', contactSchema);
export const Address = mongoose.model('Address', addressSchema);
