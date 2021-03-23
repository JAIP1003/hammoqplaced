const mongoose = require("mongoose");
const hammoqdataSchema = new mongoose.Schema({
    firstname:{
        type : String,
        requird : true
    },
    lastname:{
        type : String   
    },
    email:{
        type : String,
        requird : true,
        unique : true
    },
    password:{
        type : String,
        requird : true
       
    },
    confirmpassword:{
        type : String,
        requird : true
        
    },
    phoneno:{
        type : Number,
       
    },
    DoB:{
        type : String,
        requird : true
    },
    photo:{
        type : String,
        requird : true
    }
})

const Register = new mongoose.model("Register", hammoqdataSchema );

module.exports = Register;