let homeObj = {
    isPopulated: false,
    
    //Displays the main page
    //Populates the table with transactions
    display: function(){
        controller.clearScreen();
        controller.homeStrand.style.display = "flex";

        if(!this.isPopulated){
            this.populate();
        }
    },

    populate: function(){
        //Populate transactions
        let tbody = document.querySelector("#homeStrand tbody");

        while(tbody.children.length > 0){
            tbody.removeChild(tbody.firstChild);
        }

        for(let transaction of user.account.transactions){
            let transactionDate = new Date(transaction.date);
            let row = document.createElement("tr");
            row.onclick = ()=>{transactionObj.display(transaction._id);};
            row.classList = "transRow";
            tbody.appendChild(row);

            let date = document.createElement("td");
            date.innerText = transactionDate.toDateString();
            row.appendChild(date);

            let location = document.createElement("td");
            location.innerText = transaction.location;
            row.appendChild(location);

            let amount = document.createElement("td");
            amount.innerText = `$${Number(transaction.amount).toFixed(2)}`;
            row.appendChild(amount);
        }

        //Add categories to new transaction form
        let select = document.querySelector("#category");

        let option = document.createElement("option");
        option.value = "discretionary";
        option.innerText = "Discretionary";
        select.appendChild(option);

        for(let category of user.account.categories){
            let option = document.createElement("option");
            option.value = category.name;
            option.innerText = `${category.name[0].toUpperCase()}${category.name.slice(1)}`;
            select.appendChild(option);
        }

        

        if(select.children.length <= 0){
            banner.createError("Please add one or more categories in order to create transactions");
        }
    },

    //Axios request to create new transaction in database
    //Adds the transaction to the transaction list
    newTransaction: function(){
        event.preventDefault();

        let transaction = {
            category: document.querySelector("#category").value,
            amount: document.querySelector("#amount").value,
            date: document.querySelector("#date").value,
            location: document.querySelector("#location").value,
            note: document.querySelector("#note").value
        }

        axios.post("/budget/transaction", transaction)
            .then((response)=>{
                user.account.balance = (Number(user.account.balance) + Number(transaction.amount)).toFixed(2).toString();
                document.querySelector("#balance").innerText = user.account.balance;
                user.account.transactions.unshift(transaction);
                this.display();
            })
            .catch((err)=>{
                banner.createError("Looks like there's been an oopsie");
            });
    }
}