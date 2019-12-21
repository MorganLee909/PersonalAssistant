const mongoose = require("mongoose");

let ErrorSchema = new mongoose.Schema({
    displayMessage: String,
    error: {},
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Error", ErrorSchema);