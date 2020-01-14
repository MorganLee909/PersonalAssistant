class FinanceHead extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        let shadow = this.attachShadow({mode: "open"});
        shadow.innerHTML = `
            <h1>${user.username}'s account</h1>
            
            <h2>Balance:  $${user.account.balance.toFixed(2)}</h2>

            <div class="strandSelector">
                <p class="homeSelector">All Transactions</p>

                <p class="categoriesSelector">Categories</p>
            </div>
        `;
    }

    static get observedAttributes(){
        return ["strand"];
    }

    attributeChangedCallback(){
        setTimeout(()=>{
            let homeSelector = this.shadowRoot.querySelector(".homeSelector");
            let categoriesSelector = this.shadowRoot.querySelector(".categoriesSelector");

            if(this.strand === "home"){
                homeSelector.classList = "homeSelector currentStrand";
                categoriesSelector.classList = "categoriesSelector strandChoice";
            }else if(this.strand === "categories"){
                homeSelector.classList = "homeSelector strandChoice";
                categoriesSelector.classList = "categoriesSelector currentStrand";
            }
        });
    }
}

customElements.define("finance-head", FinanceHead);