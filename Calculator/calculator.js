const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname+"/calculatorBMI.html");
})

app.post("/", function(req, res){

    var n1 = Number(req.body.num1);
    var n2 = Number(req.body.num2);

    var result = (n1+n2);

    res.send("The result is "+result);
});

app.post("/bmicalculator", function(req, res){

    var weight = Number(req.body.weight);
    var height = Number(req.body.height);

    var result = Math.floor(weight/(Math.pow(height, 2)));

    res.send("Your BMI is "+result);
});



app.listen(4000, function(){
    console.log("Server on port 4000");
})