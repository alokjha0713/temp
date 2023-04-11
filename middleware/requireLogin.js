const jwt  = require("jsonwebtoken")
const {jwt_secret} = require("../keys.js")
const mongoose = require('mongoose');
const USER = mongoose.model("User");

module.exports= (req,res,next)=>{

    // const {authorization}=req.headers;
    // if(!authorization)
    // {
    //     return res.status (401).json({error:"you must have login"});
    // }
    // const token = authorization.replace ("bearer ", "");
    const token = req.cookies.token;
    console.log("flaksflaskdjfalsdkjf"+token)
    jwt.verify(token,jwt_secret,(err,payload)=>{
        if(err)
        {
            return res.status(401).json(err)
        }
        const {id}=payload
        console.log("middle ware"+ id);
        USER.findById(id).then(userData=>{
            console.log(userData);
            req.user = userData;
            next();
        })
    })
    
}