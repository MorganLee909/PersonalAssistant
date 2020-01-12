let categoriesObj = {
    display: function(){
        controller.clearScreen();
        controller.headComponent.style.display = "flex";
        controller.categoriesStrand.style.display = "flex";

        this.populateTables();
    },

    populateTables: function(){
        let billTable = document.querySelector("#billTable tbody");
        let incomeTable = document.querySelector("#incomeTable tbody");
        let allowanceTable = document.querySelector("#allowanceTable tbody");
        let discretionaryTable = document.querySelector("#discretionaryTable tbody");

        while(billTable.children.length > 0){
            billTable.removeChild(billTable.firstChild);
        }

        while(incomeTable.children.length > 0){
            incomeTable.removeChild(incomeTable.firstChild);
        }

        while(billTable.children.length > 0){
            allowanceTable.removeChild(allowanceTable.firstChild);
        }

        for(let transaction of user.account.transactions){
            let row = document.createElement("tr");
            row.onclick = ()=>{transactionObj.display(transaction, categoriesObj);};
            row.classList = "transRow";

            let date = document.createElement("td");
            date.innerText = (new Date(transaction.date)).toDateString();
            row.appendChild(date);

            let location = document.createElement("td");
            location.innerText = transaction.location;
            row.appendChild(location);

            let amount = document.createElement("td");
            amount.innerText = `$${transaction.amount}`;
            row.appendChild(amount);

            if(transaction.category == "discretionary"){
                discretionaryTable.appendChild(row);
            }else{
                let subCategory = "";
                for(let category of user.account.categories){
                    if(category.name === transaction.category){
                        subCategory = category.subCategory;
                        break;
                    }
                }

                if(subCategory === "bill"){
                    billTable.appendChild(row);
                }else if(subCategory === "income"){
                    incomeTable.appendChild(row);
                }else{
                    allowanceTable.appendChild(row);
                }
            }
        }
    },

    newCategory: function(){
        document.querySelector(".newCategory").style.display = "flex";
    },

    newCategoryForm: function(type){
        let newCategoryForm = document.querySelector("#newCategoryForm");

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
                    }
                })
                .catch((err)=>{
                    banner.createError("Error:  A bad thing happened that prevented good things from happening")
                })
        }

        document.querySelector(".newCategory").style.display = "none";
    }
}