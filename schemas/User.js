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
    //how do we link writings database collection to this?
    writingsLibrary: {
        type: String, 
        default: ""
    },
    //days written in a row or number of writings completed/prompts answered
    // activity: {
    //     type: Number, 
    //     default: 0
    // },
})

module.exports = mongoose.model("User", userSchema);