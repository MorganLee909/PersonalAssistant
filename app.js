const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/PersonalAssistant", {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({extended: true}));

require("./routes")(app);

const port = 8080;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})