// console.log(user);

let financePage = {
    displayTransactions: function(){
        let tbody = document.querySelector("tbody");

        for(let transaction of user.account.transactions){
            let transactionDate = new Date(transaction.date);
            let row = document.createElement("tr");
            tbody.appendChild(row);

            let date = document.createElement("td");
            date.innerText = transactionDate.toDateString();
            row.appendChild(date);

            let category = document.createElement("td");
            category.innerText = transaction.category;
            row.appendChild(category);

            let location = document.createElement("td");
            location.innerText = transaction.location;
            row.appendChild(location);

            let amount = document.createElement("td");
            amount.innerText = `$${transaction.amount}`;
            row.appendChild(amount);
        }
    },

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
            .then(()=>{
                user.account.balance = (Number(user.account.balance) + Number(transaction.amount)).toString();
                document.querySelector("#balance").innerText = user.account.balance;
                //add the transaction to the table of recent transactions
            })
            .catch((err)=>{
                console.log(err);
                banner.createError("Looks like there has been an oopsie");
            });
    }
}

financePage.displayTransactions();