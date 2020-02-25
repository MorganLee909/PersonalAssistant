const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        required: true
    },
    note: String
});

module.exports = mongoose.model("Transaction", TransactionSchema);