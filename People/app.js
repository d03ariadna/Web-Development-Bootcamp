//Conection to MondoDB with Mongoose

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

    mongoose.set('strictQuery', false);

    await mongoose.connect("mongodb://127.0.0.1:27017/peopleDB");


    //FRUITS COLLECTION
    const fruitSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 0,
            max: 10
        }
    });

    const Fruit = mongoose.model('Fruit', fruitSchema);


    //PEOPLE COLLECTION
    const peopleSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            min: 0,
            max: 100
        },
        favFruit: fruitSchema
    });

    const Person = mongoose.model('Person', peopleSchema);


    const apple = new Fruit({
        name: "Apple",
        rating: 9
    });

    const peach = new Fruit({
        name: "Peach",
        rating: 5
    });

    const banana = new Fruit({
        name: "Banana",
        rating: 8
    });

    const pineaple = new Fruit({
        name: "Pineaple",
        rating: 10
    });

    const mango = new Fruit({
        name: "Mango",
        rating: 10
    });
    //mango.save();

    //Insert
    // Fruit.insertMany([apple, peach, banana], (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Succesfully saved");
    //     }
    // });

    //Print
    Fruit.find((err, fruits) => {
        if (err) {
            console.log(err);
        } else {
            fruits.forEach(fruit => {
                console.log(fruit.name);
            });
        }
    })

    //Delete Many
    // Fruit.deleteMany({ name: "Banana" }, (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Deleted succesfully");
    //     }
    // })



    const person0 = new Person({
        name: "Katy",
        age: 25
    });
    //Save one document in the collection
    // person0.save();

    const person3 = new Person({
        name: "Sofia",
        age: 25
    });
    // person3.save().then(() => console.log('inserted row of person.'));

    const person1 = new Person({
        name: "Alex",
        age: 15
    });

    const person2 = new Person({
        name: "Math",
        age: 17
    });

    const person4 = new Person({
        name: "Amy",
        age: 15,
        favFruit: pineaple
    });
    //person4.save();



    //Save many documents in a collection
    // Person.insertMany([person1, person2, person3], function (err) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Succesfully saved");
    //     }
    // });

    //Print the names of each document in the collection
    Person.find(function (err, people) {
        if (err) {
            console.log(err);
        } else {
            //mongoose.connection.close();
            people.forEach(person => {
                console.log(person.name);
            });
            //It is important to close the connection once we are done
            // console.log(people);
        }

    });


    //Update a register
    Person.updateOne({ name: "Katy" }, { $set: { favFruit: mango } }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Register updated succesfully");
        }
    });

    // //Delete a register
    // Person.deleteMany({ name: "Melissa" }, (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("Deleted succesfully");
    //     }
    // });



}



