import { User } from "./db.js";

async function userRegistration(firstName, lastName, email, phoneNumber, password){
    await User.create({firstName, lastName, email, phoneNumber, password});
}