let controller = {
    homeStrand: document.querySelector("#homeStrand"),
    transactionStrand: document.querySelector("#transactionStrand"),
    categoriesStrand: document.querySelector("#categoriesStrand"),
    
    clearScreen: function(){
        this.homeStrand.style.display = "none";
        this.transactionStrand.style.display = "none";
        this.categoriesStrand.style.display = "none";
    },

    onStart: function(){
        homeObj.display();
    }
}

controller.onStart();