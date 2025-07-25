import { genSaltSync, hashSync } from "bcryptjs";
import { readFile, writeFile } from 'fs';

// models
import { User, Profile, Address, Contact, SocialLink } from "../models";

export const seeder = async () => {
  try {
    readFile('./seed.txt', 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      if (data != '0') {
        await deleteAllData()
        await initializeData()

        writeFile('./seed.txt', '0', 'utf-8', function (err) {
          if (err) throw err;
        });
      }

    });
  } catch (error) {
    return console.log("error: ", error);
  }
};
export const initializeData = async () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      console.log('initializing data. . .')
      const salt = genSaltSync(10);

      const data = { username: "user", password: hashSync("superadmin", salt) };
      console.log("creating user. . .");
      const user = await User.create(data);

      console.log("updating profile. . .");
      const profile = await Profile.create({
        firstname: "Jonnel Dan",
        middlename: "Nool",
        lastname: "Ibañez",
        nickname: "Dan",
        birthday: new Date("02-24-1998"),
        gender: "male",
        occupation: "Developer",
        occupationSubCategory: 'Full Stack',
        tagline: 'Bringing ideas to life through modern technologies',
        userId: user.id,
      });

      console.log("updating address. . .");
      const address = await Address.create({
        street: "Purok Masagana",
        city: "Gerona",
        province: "Tarlac",
        postalCode: "2302",
        country: "Philippines",
        isPrimary: true,
        userId: user.id,
      });

      console.log("updating contact. . .");
      const contact = await Contact.create({
        phone: "09851712329",
        secondaryPhone: "09851712329",
        email: "danibanez.x@gmail.com",
        userId: user.id,
      });

      console.log("updating social links. . .");

      const socialLink = await SocialLink.create({
        facebook: 'https://www.facebook.com/dan2498',
        github: 'https://github.com/dibanez09',
        linkedin: 'https://www.linkedin.com/in/dan-iba%C3%B1ez',
      });

      user.addressId.push(address?.id);
      user.contactId = contact.id;
      user.profileId = profile.id;
      user.socialLinkId = socialLink.id;
      await user.save();

      console.log("all user data initialized successfully");

      return resolve();
    } catch (error) {
      console.log("error: ", error);
      return reject(error)
    }
  })
};


export const deleteAllData = async () => {
  try {
    return new Promise<void>(async (resolve, reject) => {
      console.log('deleting collections. . .')
      await User.deleteMany({})
      await Profile.deleteMany({})
      await Address.deleteMany({})
      await Contact.deleteMany({})
      console.log('all collections deleted')
      resolve()
    })
  } catch (error) {
    return console.log("error: ", error);
  }
};
