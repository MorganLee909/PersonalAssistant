let controller = {
    mainStrand: document.querySelector("#mainStrand"),

    clearScreen: function(){
        this.mainStrand.style.display = "none";
    },

    onStart: function(){
        mainObj.display();
    }
}

controller.onStart();