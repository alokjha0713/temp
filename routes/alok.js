const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ALOK = mongoose.model ("ALOK");
router.post('/alok',(req,res)=>{
    const {phoneno,addr} = req.body;
    if(!phoneno || !addr)
    {
        console.log("alok is great");
    }
    const alok = new ALOK({
        phoneno,addr
    })
    alok.save().then((result)=>{
        return res.json({post: result})
    })
    .catch((err)=>{console.log(err)});
})

module.exports = router;