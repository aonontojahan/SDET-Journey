// Learning Unit Testing

import { expect } from "chai";
import {sub, sum} from "../utils/calc.js"

describe ("Calculation Test", ()=>{

    it ("Verify the sum of two numbers", ()=>{
        const result = sum (15,5);
        expect (result).to.equal(20);
    })

    it ("Verify the sub of two numbers", ()=>{
        const result = sub (15,5);
        expect (result).to.equal(10);
    })
})