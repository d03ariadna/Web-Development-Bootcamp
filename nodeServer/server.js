//const { response } = require("express");
const express = require("express");

const app = express();

app.get("/", function(req, res){
    res.send("<h1>Hello there</h1>");
});

app.get("/contact", function(req, res){
    res.send("contact me at: arod_andaira@hotmail.com");
});

app.get("/about", function(req, res){
    res.send("Hello! Nice to see you here. \nMy name is Ariadna");
});

app.listen(3000, function(){
    console.log("Server on port 3000:)");
});