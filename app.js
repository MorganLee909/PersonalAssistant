const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
// const bodyParser = require("body-parser");

const app = express();

mongoose.connect("mongodb://localhost/PersonalAssistant", {useNewUrlParser: true, useUnifiedTopology: true});

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
// app.use(bodyParser.urlencoded({extended: false}));

require("./routes")(app);

const port = 8080;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});