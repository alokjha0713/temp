const express = require('express')
const app = express()
const port=5000;
const cors = require('cors');
const {jwt_secret} =require( './keys.js');
const mongoose = require('mongoose');
const cookieParser=require('cookie-parser')

require("./models/models.js");
require("./models/post.js")
require("./models/alok.js")
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//app.use is used so that we can use middleware funtion 
app.use(require('./routes/auth.js'));
app.use(require('./routes/createPost.js'));
app.use(require("./routes/alok.js"));
mongoose.connect("mongodb+srv://arpitgajya2001:Jeemain_123@cluster0.h0zchzp.mongodb.net/?retryWrites=true&w=majority");
app.listen(port,()=>{
    console.log('server is running on port '+port);
})
mongoose.connection.on("connected",()=>{
    console.log("successfully connected to mongodb");
})
mongoose.connection.on("error",()=>{
    console.log("not connected to mongodb");
})