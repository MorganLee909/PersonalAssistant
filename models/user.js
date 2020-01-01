const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [3, "First name must contain at least three characters"],
        required: [true, "First name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        minlength: [8, "Password must contain at least 8 characters"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    account: {
        transactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        }],
        categories: {
            bills: [{
                name: {
                    type: String,
                    required: true
                },
                amount: Number
            }],
            income: [{
                name: {
                    type: String,
                    required: true
                }
            }],
            allowances: [{
                name: {
                    type: String,
                    required: true
                },
                amount: Number
            }],
        },
        balance: Number
    }
});

module.exports = mongoose.model("User", UserSchema);