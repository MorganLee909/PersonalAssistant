window.transactionObj = {
    //Detailed display of a single transaction
    display: function(transaction, location){
        controller.clearScreen();
        controller.headComponent.style.display = "none";
        controller.transactionStrand.style.display = "flex";
        document.querySelector("#returnButton").onclick = ()=>{location.display();};

        document.querySelector("#transBalance").innerText = user.account.balance;

        document.querySelector("#transDate").innerText = new Date(transaction.date).toDateString();
        document.querySelector("#transCategory").innerText = `${transaction.category[0].toUpperCase()}${transaction.category.slice(1)}`;
        document.querySelector("#transLocation").innerText = transaction.location;
        document.querySelector("#transAmount").innerText = `$${transaction.amount}`;
        document.querySelector("#transNote").innerText = transaction.note;
    },
}