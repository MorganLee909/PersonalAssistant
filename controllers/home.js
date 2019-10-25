const User = require("../models/user.js");

const bcrypt = require("bcryptjs");

module.exports = {
    landingPage: function(req, res){
        console.log(req.session.user);
        return res.render("homePage/home");
    },

    register: function(req, res){
        let user = JSON.parse(req.body.user);

        if(user.password !== user.confirmPassword){
            return res.redirect("/");
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);

        let newUser = new User({
            username: user.username,
            email: user.email,
            password: hash
        });

        User.find({email: newUser.email})
            .then((users)=>{
                if(users.length > 0){
                    //Need to display error message for email exists
                    return res.redirect("/");
                }

                newUser.save()
                    .then((user)=>{
                        req.session.user = user._id;
                        return res.redirect("/dashboard");
                    })
                    .catch((err)=>{
                        console.log(err);
                        return res.render("shared/error");
                    });
            })
            .catch((err)=>{
                console.log(err);
                return res.render("shared/error");
            });
    },

    login: function(req, res){
        let loginer = JSON.parse(req.body.user);
        User.findOne({email: loginer.email})
            .then((user)=>{
                if(bcrypt.compareSync(loginer.password, user.password)){
                    req.session.user = user._id;
                    return res.redirect("/dashboard")
                }else{

                }
            })
            .catch((err)=>{
                console.log(err);
                return res.render("shared/error");
            });
    },

    dashboard: function(req, res){
        return res.render("/dashboardPage/dashboard");
    }
}