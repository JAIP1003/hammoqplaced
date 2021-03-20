const mongoose = require("mongoose");
const hammoqdataSchema = new mongoose.Schema({
    firstname:{
        type : String,
        requird : true
    },
    lastname:{
        type : String,
        
    },
    email:{
        type : String,
        requird : true,
        unique : true
    },
    password:{
        type : String,
       
    },
    confirmpassword:{
        type : String,
        
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

const SignUp = new mongoose.model("SignUp", hammoqdataSchema );

module.exports = SignUp;