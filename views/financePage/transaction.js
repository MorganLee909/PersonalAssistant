let transactionObj = {
    //Detailed display of a single transaction
    display: function(id){
        controller.clearScreen();
        controller.transactionStrand.style.display = "flex";

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
}