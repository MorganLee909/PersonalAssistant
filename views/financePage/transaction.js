let transactionObj = {
    //Detailed display of a single transaction
    display: function(id){
        controller.clearScreen();
        controller.transactionStrand.style.display = "flex";

        document.querySelector("#transBalance").innerText = user.account.balance;

        let currentTransaction = {};
        for(let transaction of user.account.transactions){
            if(transaction._id === id){
                currentTransaction = transaction;
                break;
            }
        }

        document.querySelector("#transDate").innerText = new Date(currentTransaction.date).toDateString();
        document.querySelector("#transCategory").innerText = `${currentTransaction.category[0].toUpperCase()}${currentTransaction.category.slice(1)}`;
        document.querySelector("#transLocation").innerText = currentTransaction.location;
        document.querySelector("#transAmount").innerText = `$${currentTransaction.amount}`;
        document.querySelector("#transNote").innerText = currentTransaction.note;
    },
}