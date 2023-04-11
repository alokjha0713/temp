const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
const postSchema =new  mongoose.Schema({
    body:{
        type:String,
        required:true,
    },
    pic:{
        type:String,
        required:true,
    },
    postedBy:{
        type:ObjectId,
        ref:'USER'
    }

})
mongoose.model("POST",postSchema);