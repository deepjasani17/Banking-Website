const mongoose = require("mongoose");

const Thistory = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    from:{
        type:String,
    },
    to:{
        type:String,
    },
    acnum:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    balance:{
        type:Number,
        require:true
    }
})

const TransectionHistory = new mongoose.model("Transection_history", Thistory)

module.exports = TransectionHistory;