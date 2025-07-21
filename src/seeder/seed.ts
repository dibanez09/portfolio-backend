import { genSaltSync, hashSync } from "bcryptjs";

// models
import { User, Profile, Address, Contact } from "../models";

export const initializeData = async () => {
  try {
    const salt = genSaltSync(10);

    const data = { username: "user", password: hashSync("superadmin", salt) };
    console.log("creating user. . .");
    const user = await User.create(data);

    const profile = await Profile.create({
      firstname: "Jonnel Dan",
      middlename: "Nool",
      lastname: "Ibañez",
      nickname: "Dan",
      birthday: new Date("02-24-1998"),
      gender: "male",
      occupation: "Developer",
      occupationSubCategory: 'Full Stack',
      userId: user.id,
    });

    const address = await Address.create({
      street: "Purok Masagana",
      city: "Gerona",
      province: "Tarlac",
      postalCode: "2302",
      country: "Philippines",
      isPrimary: true,
      userId: user.id,
    });

    const contact = await Contact.create({
      phone: "09851712329",
      secondaryPhone: "09851712329",
      email: "danibanez.x@gmail.com",
      userId: user.id,
    });

    user.addressId.push(address?.id);
    user.contactId = contact.id;
    user.profileId = profile.id;
    await user.save();

    const newData = await User.find().populate("profileId");
    console.log(newData);
  } catch (error) {
    return console.log("error: ", error);
  }
};
