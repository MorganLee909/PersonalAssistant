const User = require("../models/user");
const Transaction = require("../models/transaction");

module.exports = {
    finances: function(req, res){
        if(!req.session.user){
            req.session.error = "Must be logged in to do that";
            return res.redirect("/");
        }

        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        User.findOne({_id: req.session.user})
            .populate({
                path: "account.transactions",
                match: {date: {
                    $gte: firstDay,
                    $lt: lastDay
                }}
            })
            .then((user)=>{
                user.password = undefined;
                return res.render("financePage/finance", {user: user});
            })
            .catch((err)=>{
                let errorMessage = "Error: Unable to retrieve user data";
                let error = new Error({
                    displayMessage: errorMessage,
                    error: err
                });
                error.save()

                return res.redirect("/dashboard", {error: error});
            });
    },

    createTransaction: function(req, res){
        if(!req.session.user){
            req.session.error = "Must be logged in to do that";
            return res.redirect("/");
        }

        let newTransaction = new Transaction(req.body);
        newTransaction.save()
            .then((transaction)=>{
                User.findOne({_id: req.session.user})
                    .then((user)=>{
                        user.account.balance = (user.account.balance + transaction.amount).toFixed(2);
                        user.account.transactions.push(transaction);
                        user.save()
                            .then((user)=>{
                                return res.json({});
                            })
                            .catch((err)=>{
                                let errorMessage = "Error: Unable to save data";
                                let error = new Error({
                                    displayMessage: errorMessage,
                                    error: err
                                });
                                error.save();

                                return res.json(errorMessage);
                            });
                    })
                    .catch((err)=>{
                        let errorMessage = "Error: Unable to retrieve user data";
                        let error = new Error({
                            displayMessage: errorMessage,
                            error: err
                        });
                        error.save();

                        return res.json(errorMessage);
                    })
            })
            .catch((err)=>{
                let errorMessage = "Error: Unable to create a new transaction";
                let error = new Error({
                    displayMessage: errorMessage,
                    error: err
                });
                error.save();

                return res.json(displayMessage);
            });
    },

    //Creates a new transaction category
    //Inputs:
    //  req.body.categoryName: the name of the category to place it in
    //  req.body.data:  The category object
    createCategory: function(req, res){
        if(!req.session.user){
            req.session.error = "Must be logged in to do that";
            return res.redirect("/");
        }

        User.findOne({_id: req.session.user})
            .then((user)=>{
                req.body.name = req.body.name.toLowerCase();
                user.account.categories.push(req.body);
                user.save()
                    .then((user)=>{
                        return res.json({});
                    })
                    .catch((err)=>{
                        console.log(err);
                        return res.json("Error: unable to save data");
                    });
            })
            .catch((err)=>{
                console.log(err);
                return res.json("Error: Unable to retrive user data");
            });
    }
}