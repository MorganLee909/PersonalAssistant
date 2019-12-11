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

        User.findOne({_id: "5dc958d6b9077f29dc69bec9"})
            .populate({
                path: "account.transactions",
                match: {date: {
                    $gte: firstDay,
                    $lt: lastDay
                }},
                options: {sort: "-date"}
            })
            .then((user)=>{
                Transaction.find()
                return res.render("financePage/finance", {user: user});
            })
            .catch((err)=>{
                console.log(err);
                return res.render("error");
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
                User.findOne({_id: "5dc958d6b9077f29dc69bec9"})
                    .then((user)=>{
                        user.account.balance = (user.account.balance + transaction.amount).toFixed(2);
                        user.account.transactions.push(transaction);
                        user.save()
                            .then((user)=>{
                                return res.json();
                            })
                            .catch((err)=>{
                                console.log(err);
                                return res.redirect("/error");
                            });
                    })
                    .catch((err)=>{
                        console.log(err);
                        return res.redirect("/error");
                    })
            })
            .catch((err)=>{
                console.log(err);
                return res.redirect("/error");
            });
    }
}