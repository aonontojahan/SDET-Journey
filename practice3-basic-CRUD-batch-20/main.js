import { initDB, closeDB } from "./db.js";
import { userUpdate, userRegistration, userList, userSearch, userDelete } from "./userController.js";

await initDB();
//await userRegistration("User7", "Test", "user7@test.com", "01723740701", "1234");
//await userList();
//await userUpdate("1", { firstName: "Rahim", lastName: "Mia"});
//await userSearch("User1");
await userDelete("10");

await closeDB();