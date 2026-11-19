import { user } from "./db.js";
import { Op } from "sequelize";

export async function userRegistration(firstName, lastName, email, phoneNumber, password){

    const existing = await user.findOne({where:{email}});
    if (existing){
        console.log("User is already registered");
    }
    else{
        await user.create({firstName, lastName, email, phoneNumber, password});
        console.log("User is created Successfully");
    }

}

export async function userList (){
    const users = await user.findAll();
    console.log (JSON.stringify(users, null, 2));
}

export async function userUpdate(id, updates){
    const [rowsUpdates] = await user.update(updates, {where: {id}})
    console.log(rowsUpdates);
}

export async function userSearch(searchTerm){
    const users = await user.findAll({
        where: {
            [Op.or]: [
                { firstName: { [Op.like]: `%${searchTerm}%` } },
                { lastName: { [Op.like]: `%${searchTerm}%` } },
                { email: { [Op.like]: `%${searchTerm}%` } },
                { phoneNumber: { [Op.like]: `%${searchTerm}%` } }
            ]
        }
    });
    console.log(JSON.stringify(users, null, 2));
    return users;
}

export async function userDelete(id){
    const isDeleted = await user.destroy({where:{id}})
    if (isDeleted){
        console.log("Deleted Successfully")
    }
    else{
        console.log("No user Found")
    }
}