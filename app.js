const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

mongoose.connect(process.env.PERSONAL_ASSISTANT, {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");

app.use(session({
    secret: "my own super secret text",
    cookie: {secure: false},
    saveUninitialized: true,
    resave: false
}));
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

require("./routes")(app);

app.listen(process.env.PORT, ()=>{
    console.log(`Running on port ${process.env.PORT}`);
});