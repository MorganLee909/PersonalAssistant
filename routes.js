const home = require("./controllers/home");
const finance = require("./controllers/finance");

module.exports = function(app){
    //Home
    app.get("/", home.landingPage);
    app.get("/dashboard", home.dashboard);
    app.post("/register", home.register);
    app.post("/login", home.login);

    //Finances
    app.get("/finances", finance.finances);
}