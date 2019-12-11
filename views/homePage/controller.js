let controller = {
    loginRegStrand: document.querySelector("#loginRegStrand"),

    clearScreen: function(){
        this.loginRegStrand.style.display = "none";
    },

    onStart: function(){
        if(error){
            banner.createError(error);
        }
        
        loginRegObj.display();
    }
}

controller.onStart();