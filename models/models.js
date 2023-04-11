const mongoose = require("mongoose");
const jwt=require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
    },
    userName: {
        type : String,
        required: true,
    },
    email: {
        type : String,
        required: true,
    },
    password: {
        type : String,
        required: true,
    },
    token:{
        type:String
    }
})

userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},"alokranjanjha",{
         expiresIn:"3d"
     })
 }

mongoose.model("User",userSchema);