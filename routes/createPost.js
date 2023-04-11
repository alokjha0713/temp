const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require("../middleware/requireLogin.js");
const User=require('../models/models.js')
const jwt = require('jsonwebtoken')
const POST =mongoose.model("POST");
// Route
router.post("/createPost",(req,res)=>{
   
    console.log("Token In Create Post "+req.cookies.token)
    const token=req.cookies.token;
    const decode=jwt.verify(token,"alokranjanjha")
        console.log(decode)
    const id=decode.id;
    console.log("0000000000000000000000000000000000000000000000000"+id);
    const {body,pic} = req.body;
    if(!body || !pic)
    {
        res.status(422).json({error:"Please add all the feilds"})
    }
    req.user;
    console.log(req.user);
    const post = new POST({
        body,pic, postedBy:req.user
    })
    post.save().then((result)=>{
        return res.json({post: result})
    })
    .catch((err)=>{console.log(err)});
})
module.exports = router;