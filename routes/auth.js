const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const USER = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwt_secret} =require( '../keys.js');
const requireLogin = require('../middleware/requireLogin.js');
const cookieToken=require('../config/cookieToken')
router.get('/',(req,res)=>{
    console.log("Token In cookie "+req.cookies.token)
    console.log("jfdjfjfhjdfhjdfh")
    // res.send("hello")
})
router.post('/signup',async (req,res)=>{
    const {name,userName,email,password} = req.body;
    if(!name || !email || !userName || !password)
    {
        return res.status(422).json({error: "Please add all the feilds"})
    }
    const user=await USER.create({
        name,
        userName,
        email,
        password,
    })

    const token=user.getJwtToken();
    console.log(token)
    // cookieToken(user,res)

    // localStorage.setItem('token',token);
    
    const newData={
        name:name,
        userName:userName,
        email:email,
        password:password,
        token:token
    }
    const id=user._id;
    const user1=await USER.findByIdAndUpdate(id,newData)

    // cookieToken(user1,res);
    res.status(200).json({
        user1
    })
    
})


router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(!email ||!password)
    {
        return res.status(422).json({error:"please add email and password"});
    }
    
    USER.findOne({$or:[{email: email}]}).then((savedUser)=>{
        if(!savedUser)
        {
            return res.status(422).json({error:"Invalid email"});
        }
        console.log(savedUser);
        bcrypt.compare(password,savedUser.password).then((match)=>{
            if(match){
                // res.status(200).json({message:"Password matched correctly"})

                // const token = jwt.sign({_id: savedUser.id},jwt_secret);
                // console.log(save);
                // res.json({token: token});
                // console.log(token);
                const token=savedUser.getJwtToken()
                // console.log("Token" +token)
                // cookieToken(savedUser,res)
                res.cookie('token',null,{
                    expires:new Date(Date.now()),
                    httpOnly:true
                })
                // console.log("Token In Cookie "+req.cookies.token)
                return ;
            }
            else{res.status(422).json({error :"Password is incorrect"});}
        })
        
    })
})
module.exports = router;