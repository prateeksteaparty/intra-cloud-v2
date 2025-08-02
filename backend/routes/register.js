const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const {User} = require('../model/userSchema');
require('dotenv').config();
const {JWT_SECRET} = process.env;
const bcrypt = require('bcrypt');


const registerSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string()
})


router.post("/register", async(req , res)=>{

    const body = req.body;

    const {success} = registerSchema.safeParse(body);
    
    if(!success){
        return res.status(409).json({
            message: "Incorrect Inputs"
        })
    }

    const existingUser = await User.findOne({
        email: body.email
    })

    if(existingUser){
        return res.status(409).json({
            message: "Email Already Taken"
        })
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

    // auth | after creating user here ill do auth 
    const token = jwt.sign({userID: user._id}, JWT_SECRET);
    res.json({
        message: "User Created Successfully",
        token: token
    })

})


// MARK - I
//  {
//     "message": "User Created Successfully",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2N2Y1M2Q0MzFjZGVhZjMwODNlNzQzMzkiLCJpYXQiOjE3NDQxMjUyNTJ9.NAXQf_4zGiTvQofVqtsxn0D_ffrl4Ztc86EwY_jKFZ0"
// } 


module.exports = router;