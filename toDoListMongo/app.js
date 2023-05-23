const express = require("express");
const { redirect } = require("express/lib/response");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();


app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/Public"));

const results = [];

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1:27017/toDoListDB", {useNewUrlParser: true});

const itemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({
    name: "Welcome to your To Do List!"
});
const item2 = new Item({
    name: "Click + to add something"
});
const item3 = new Item({
    name: "Check the item once you've done -->"
});

const defItems = [item1, item2, item3];


const listSchema = {
    name: String,
    items: [itemSchema]
};
const List = mongoose.model("List", listSchema);


app.get("/", (req, res) => {

    Item.find((err, elements)=> {

        //If the collection of items is empty, we add the default items
        if(elements.length === 0){
            Item.insertMany(defItems, (err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("Succesfully Saved");
                }
            });

            //Once we have added the items, we refresh the server
            //in order to show the items previously added.
            //It will be done in the else statement
            res.redirect("/");  
        }else{
            res.render("list", { listTitle: "Today", Day: "To Do List", newListItems: elements });
        }
    });
    //res.send(today + " " + todayN);
})


app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/:customList", (req, res)=>{

    const customListN = _.capitalize(req.params.customList);
    console.log(customListN);

    List.findOne({name: customListN}, (err, listFound) => {
        if(!err){
            if(!listFound){
                //Create a new list
                const list = new List({
                    name: customListN,
                    items: defItems
                });
                list.save();
                res.redirect("/"+customListN);
                //res.render("list", {listTitle: (list.name), Day: "TO DO LIST", newListItems: list.items});
            }else{
                //Show the existing list
                console.log("This name list already exists");  
                res.render("list", { listTitle: (listFound.name), Day: "To Do List", newListItems: listFound.items});
            }
        }else{
            console.log(err);
        }
    });

});



app.post("/", (req, res) => {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const newItem = new Item({
        name: itemName
    });

    if(listName === "Today"){
        newItem.save();
        res.redirect("/");
    }else{
        List.findOne({name: listName}, (err, listFound) => {
            if(!err){
                listFound.items.push(newItem);
                listFound.save();
                res.redirect("/"+listFound.name);
            }else{
                console.log(err);
            }
        });
    }

    // let item = req.body.newItem;
    // items.push(item);
    // res.redirect("/");
});

app.post("/delete", (req,res) => {
    const itemChecked = (req.body.check); 
    listName = req.body.listName;

    if(listName === "Today"){
        //If the item checked is from this list, 
        //it will be removed from items
        Item.findByIdAndRemove(itemChecked, (err)=> {
            if(err){
                console.log(err);
            }else{
                console.log("Succesfully deleted");
                setTimeout(() => {res.redirect("/");}, 500);
            }
        });

    }else{
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: itemChecked}}},
            (err, listFound) => {
            if(!err){
                console.log("Deleted");
                setTimeout(() => {
                    res.redirect("/"+listName);
                }, 500); 
            }else{
                console.log(err);
            }
        });
    }
    
});

app.listen(3000, () => console.log("Server on port 3000"))