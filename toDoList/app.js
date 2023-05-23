const express = require("express");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["Buy food", "Go to the gym", "Attend course"];

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/Public"));

app.get("/", (req, res) => {


    // var day = new Date().toLocaleDateString('en-us', { weekday: 'long' });

    let today = date.getDate(); //Node module
    let day = date.getDay();

    res.render("list", { day: day, today: today, newListItems: items });
    //res.send(today + " " + todayN);
})


app.get("/about", (req, res) => {
    res.render("about");
})

app.post("/", (req, res) => {
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})

app.listen(3000, () => console.log("Server on port 3000"))