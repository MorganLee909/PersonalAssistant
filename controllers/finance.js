const User = require("../models/user");
const Transaction = require("../models/transaction");

module.exports = {
    finances: function(req, res){
        // if(req.session.user){
            let date = new Date();
            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            console.log(firstDay);
            console.log(lastDay);

            User.findOne({_id: "5dc566fdf739f91be5726130"})
                .populate({
                    path: "account.transactions",
                    match: {date: {
                        $gte: firstDay,
                        $lt: lastDay
                    }}
                })
                .then((user)=>{
                    Transaction.find()
                    return res.render("financePage/finance", {user: user});
                })
                .catch((err)=>{
                    console.log(err);
                    return res.render("error");
                });
        // }
    },

    createTransaction: function(req, res){
        // if(req.session.user){
            let newTransaction = new Transaction(req.body);
            newTransaction.save()
                .then((transaction)=>{
                    User.findOne({_id: "5dc566fdf739f91be5726130"})
                        .then((user)=>{
                            user.account.balance += transaction.amount;
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
                })
        // }
    }
}