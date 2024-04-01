const mongoose = require("mongoose");

const Scema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    // bank:{
        account_type:{
            type:String,
            require:true,
        },
        account_num:{
            type:String,
            require:true,
            unique:true,
        },
        upiId:{
            type:String,
            require:true,
            unique:true
        },
        balance:{
            type:Number,
            require:true,
        },
    // },
    country:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

const Register = new mongoose.model("Register", Scema)

module.exports = Register;