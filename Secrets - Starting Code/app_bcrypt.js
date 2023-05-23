require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const md5 = require('md5');
const bcrypt = require('bcryptjs');
//const encrypt = require('mongoose-encryption');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1:27017/usersDB", {useNewUrlParser: true});


const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

//Encrypting with mongoose-encryption
//userSchema.plugin(encrypt, { secret: (process.env.SECRET), encryptedFields: ['password'] });

const User = new mongoose.model('User', userSchema);



app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render('login');
});

app.get("/register", (req, res) => {
    res.render('register');
});


app.post('/register', (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (!err) {
            const newUser = new User({
                email: req.body.email,
                password: hash
            });

            newUser.save().then(
                (resp) => {
                res.render('secrets');
            }).catch((err) => {
                console.log(err);
            });
        } else {
            console.log(err);
        }
        
    });

});


app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: username })
        .then((foundUser) => {
            if (foundUser) {

                //Validation made with bcrypt
                bcrypt.compare(password, foundUser.password, (err, results) => {
                    if (results === true) {
                        res.render('secrets');
                    } else {
                        res.send(err);
                    }
                })

                //Validation made with md5
                // if (foundUser.password === password) {
                //     res.render('secrets');
                // } else {
                //     console.log('Wrong password');
                // }
            }
        }).catch((err) => {
            console.log(err);
        });
});


    app.listen(3000, (req, res) => {
    console.log("Server on port 3000");
});