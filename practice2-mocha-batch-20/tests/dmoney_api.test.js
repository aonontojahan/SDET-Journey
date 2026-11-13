import axios from "axios"
import { expect } from "chai"

describe("dMoney integrtion testing", ()=>{
    let access_token = "";
    it ("Verify admin can login with correct creds", async ()=>{

        let {data} = await axios.post("http://localhost:5000/user/login", {
            email: "admin@dmoney.com",
            password: "1234"
        },{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        console.log(data.token)
        access_token = data.token
    })
    
    it ("Verify that admin can search with userId", async ()=>{
        let {data} = await axios.get("http://localhost:5000/user/search/id/1", {
            headers:{
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        })
        console.log(data)
        expect (data.message).to.contains("User found")
    })
})