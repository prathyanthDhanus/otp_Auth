const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    phoneNumber:{
     type:String,
    //  unique:true
    },
  
  });
  
  const user = mongoose.model("user", userSchema);
  module.exports = user;