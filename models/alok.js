const mongoose = require("mongoose");

const alokSchema =new  mongoose.Schema({
    phoneno:{
        type:String,
    },
    addr:{
        type:String,
    }
    
})
mongoose.model("ALOK",alokSchema);