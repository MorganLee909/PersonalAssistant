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
        },

        category: {
            name: function(name, createBanner = true){
                if(!validator.isSanitary(name)){
                    if(createBanner){
                        banner.createError("The name contains invalid characters");
                    }
                    return false;
                }

                return true;
            },

            subCategory: function(subCat, createBanner = true){
                if(subCat === "bill" || subCat === "allowance" || subCat === "income"){
                    return true;
                }

                banner.createError("You have an incorrect type");
                return false;
            },

            quantity: function(num, createBanner = true){
                if(isNaN(num) || num === ""){
                    if(createBanner){
                        banner.createError("Must enter a valid number");
                    }
    
                    return false;
                }
    
                if(num < 0){
                    if(createBanner){
                        banner.createError("Quantity cannot be a negative number");
                    }
    
                    return false;
                }
    
                return true;
            }
        }
    },
    
    isSanitary: function(str){
        let disallowed = ["\\", "<", ">", "$"];

        for(let char of disallowed){
            if(str.includes(char)){
                return false;
            }
        }

        return true;
    }
}