import axios from "axios"

describe("dMoney integrtion testing", ()=>{
    it ("Verify admin can login with correct creds", async ()=>{

        let res = await axios.post("http://localhost:5000/user/login", {
            email: "admin@dmoney.com",
            password: "1234"
        },{
            headers:{
                "Content-Type" : "application/json"
            }
        })
        console.log(res)

    })
})