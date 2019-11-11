// console.log(user);

let financePage = {
    home: document.querySelector(".home"),
    transaction: document.querySelector(".transaction"),

    //Displays the main page
    //Populates the table with transactions
    displayHome: function(){
        this.home.style.display = "flex";
        this.transaction.style.display = "none";

        let tbody = document.querySelector(".home tbody");

        while(tbody.children.length > 0){
            tbody.removeChild(tbody.firstChild);
        }

        for(let transaction of user.account.transactions){
            let transactionDate = new Date(transaction.date);
            let row = document.createElement("tr");
            row.onclick = ()=>{this.singleTransaction(transaction._id);};
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
    },

    //Detailed display of a single transaction
    singleTransaction: function(id){
        this.home.style.display = "none";
        this.transaction.style.display = "block";

        let currentTransaction = {};
        for(let transaction of user.account.transactions){
            if(transaction._id === id){
                currentTransaction = transaction;
                break;
            }
        }

        document.querySelector("#transDate").innerText = new Date(currentTransaction.date).toDateString();
        document.querySelector("#transCategory").innerText = currentTransaction.category;
        document.querySelector("#transLocation").innerText = currentTransaction.location;
        document.querySelector("#transAmount").innerText = `$${currentTransaction.amount}`;
        document.querySelector("#transNote").innerText = currentTransaction.note;
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
            .then(()=>{
                user.account.balance = (Number(user.account.balance) + Number(transaction.amount)).toFixed(2).toString();
                document.querySelector("#balance").innerText = user.account.balance;
                user.account.transactions.unshift(transaction);
                this.displayHome();
            })
            .catch((err)=>{
                console.log(err);
                banner.createError("Looks like there's been an oopsie");
            });
    }
}

financePage.displayHome();