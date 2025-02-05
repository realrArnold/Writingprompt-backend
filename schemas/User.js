const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    token: {
        type: String
    },
    //on submit needs to add one to this
    writingsAmount: {
        type: Number, 
        default: 0
    },
    //on submit needs to add one to this
    reviewsAmount: {
        type: Number, 
        default: 0
    },
    

    // //how do we link writings database collection to this?
    // writingsLibrary: {
    //     type: String, 
    //     default: ""
    // },
  
})

module.exports = mongoose.model("User", userSchema);