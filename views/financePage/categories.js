let categoriesObj = {
    display: function(){
        controller.clearScreen();
        controller.categoriesStrand.style.display = "flex";
    },

    newCategory: function(){
        document.querySelector(".newCategory").style.display = "flex";
    },

    newCategoryForm: function(type){
        let newCategoryForm = document.querySelector("#newCategoryForm");
        let allowanceLabel = document.querySelector("#allowanceLabel");

        document.querySelector(".categoryType").style.display = "none";
        newCategoryForm.style.display = "flex";

        newCategoryForm.categoryType = type;

        if(type === "allowance"){
            console.log("isallow");
            allowanceLabel.style.display = "block";
        }else{
            console.log("isallow");
            allowanceLabel.style.display = "none";
        }
    },

    submitNewCategory: function(){
        let newCategoryForm = document.querySelector("#newCategoryForm");
        let allowanceLabel = document.querySelector("#allowanceLabel");
        let name = document.querySelecotr("#categoryName").value;
        let quantity = 0;

        if(newCategoryForm.categoryType === "allowance"){
            allowanceLabel.style.display = "block";
            quantity = document.querySelector("#allowanceInput");
        }else{
            allowanceLabel.style.display = "none";
        }
    }
}