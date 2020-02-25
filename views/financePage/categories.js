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
    },

    submitNewCategory: function(){
        event.preventDefault();

        let form = document.querySelector("#newCategoryForm");

        let newCategory = {
            name: document.querySelector("#categoryName").value,
            subCategory: form.categoryType,
            amount: document.querySelector("#catAmount").value
        }

        if(validator.user.category.name(newCategory.name) && validator.user.category.quantity(newCategory.amount)){
            axios.post("/budget/category/create", newCategory)
                .then((response)=>{
                    if(typeof(response.data) === "string"){
                        banner.createError(response.data);
                    }else{
                        banner.createNotification(`Category '${newCategory.name}' has been created`);
                        form.style.display = "none";
                    }
                })
                .catch((err)=>{
                    banner.createError("Error:  A bad thing happened that prevented good things from happening")
                })
        }
    }
}