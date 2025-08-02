const express = require('express');
const router = express.Router();
const {User} = require('../model/userSchema');
const zod = require('zod');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');


const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

router.post("/login", async (req, res)=>{
    const body = req.body;
    
    const {success} = loginSchema.safeParse(body);

    if(!success){
        return res.status(400).json({
            message: "Bad email/password format"
        })
    }

    const user = await User.findOne({
        email : req.body.email
    })

    if(!user){
        return res.status(401).json({
            message : "Invalid email or password"
        })
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if(!passwordMatch){
        return res.status(401).json({
            message: "Invalid Email or password"
        })
    }

    const token = jwt.sign({userId: user._id}, JWT_SECRET);

    res.status(200).json({
        message: "Login Successful",
        token: token,
        username: user.username
    })

})


module.exports = router;


