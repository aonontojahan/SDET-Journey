import { faker } from "@faker-js/faker";
import axios from "axios"
import { expect } from "chai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { generateRandomNumber } from "../utils/randomNumber.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("baseUrl from env:", process.env.baseUrl);
console.log("access_token from env:", process.env.access_token ? "***" : "not found");

describe("dMoney integrtion testing", ()=>{
    let access_token = process.env.access_token;
    let baseUrl = process.env.baseUrl;
    it ("Verify admin can login with correct creds", async ()=>{

        let {data} = await axios.post(`${baseUrl}/user/login`, {
            email: "admin@dmoney.com",
            password: "1234"
        }, {
            headers:{
                "Content-Type" : "application/json"
            }
        })
        console.log(data.token)
        access_token = data.token
    })

it ("Create new customer", async() => {
        let {data} = await axios.post(`${baseUrl}/user/create`, {
            "name": faker.person.fullName(),
            "email": `aonontojahan+${generateRandomNumber(1000,9999)}@gmail.com`,
            "password": "1234",
            "phone_number": `0170${generateRandomNumber(1000000,9999999)}`,
            "nid": `${generateRandomNumber(1000000000000,9999999999999)}`,
            "role": "Customer"
        }, {
            headers:{
                Authorization : `Bearer ${access_token}`,
                "Content-Type": "application/json",
                "X-AUTH-SECRET-KEY": "ROADTOSDET"
            }
        }).catch(err => {
            console.error("Error response:", err.response?.data);
            throw err;
        })
        console.log("Created user:", data)
    })
    
    it ("Verify that admin can search with userId", async ()=>{
        let {data} = await axios.get(`${baseUrl}/user/search/id/1`, {
            headers:{
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
                "X-AUTH-SECRET-KEY": "ROADTOSDET"
            }
        })
        console.log(data)
        expect (data.message).to.contains("User found")
    })
})