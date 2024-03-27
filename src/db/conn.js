const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:'../.env'});
const path = process.env.DBCONNECT ;
mongoose.connect(path,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    // useCreateIndex:true
}).then(()=>{
    console.log('connection successful');
}).catch((e)=>{
    console.log(e);
})