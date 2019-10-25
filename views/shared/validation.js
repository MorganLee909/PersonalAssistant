let validator = {
    user: {
        username: function(name, createBanner = true){
            if(name.length < 3){
                if(createBanner){
                    banner.createError("Username must be at least 3 characters");
                }
                return false;
            }

            return true;
        },

        email: function(email, createBanner = true){
            return true;
        },

        password: function(password, createBanner = true){
            if(password.length < 8){
                if(createBanner){
                    banner.createError("Password must be at least 8 characters");
                }
                return false;
            }

            return true;
        },

        all: function(user, createBanner = true){
            let nameCheck = this.username(user.username, createBanner);
            let emailCheck = this.email(user.email, createBanner);
            let passwordCheck = this.password(user.password, createBanner);

            if(!nameCheck || !emailCheck || !passwordCheck){
                return false;
            }

            return true;
        },

        confirmPassword: function(pass, confirmPass, createBanner = true){
            if(pass !== confirmPass){
                if(createBanner){
                    banner.createError("Passwords do not match");
                }
                return false;
            }
            return true;
        }
    },    
}