// console.log(user);

let financePage = {
    displayTransactions: function(){
        let tbody = document.querySelector("tbody");

        while(tbody.children.length > 0){
            tbody.removeChild(tbody.firstChild);
        }

        for(let transaction of user.account.transactions){
            let transactionDate = new Date(transaction.date);
            let row = document.createElement("tr");
            tbody.appendChild(row);

            let date = document.createElement("td");
            date.innerText = transactionDate.toDateString();
            row.appendChild(date);

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
                user.account.balance = "$" + (Number(user.account.balance) + Number(transaction.amount)).toString();
                document.querySelector("#balance").innerText = user.account.balance;
                user.account.transactions.unshift(transaction);
                this.displayTransactions();
            })
            .catch((err)=>{
                console.log(err);
                banner.createError("Looks like there has been an oopsie");
            });
    }
}

financePage.displayTransactions();