const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + 'public'));


//Mongoose configuration

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB', { useNewUrlParser: true });

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const article = mongoose.model('article', articleSchema);


app.get('/', (req, res) => {
    res.send("Done!");
});

//We are making a chained route in order to specify all the methods for the 'articles' route
app.route('/articles')
    
    .get((req, res) => {
        article.find().then((foundArticles) => {
            res.send(foundArticles);
        }).catch((err) => {
            console.log(err);
        });
    })


    .post((req, res) => {
        const title = (req.body.title);
        const content = (req.body.content);

        const newArticle = new article({
            title: title,
            content: content
        })

        newArticle.save().then(() => {
            res.send('Inserted');
        }).catch((err) => {
            res.send(err);
        })
    })


    .delete((req, res) => {
        article.deleteMany().then(() => {
            res.send('All articles were deleted');
        }).catch((err) => {
            res.send(err);
        });
    });


app.route('/articles/:articleName')
    .get((req, res) => {
        let reqArticle = _.capitalize(req.params.articleName);
        console.log(reqArticle);

        article.findOne({ title: reqArticle }).then((foundArticle) => {
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send('Article was not found');
            }
        }).catch((err) => {
            res.send(err);
        });
    })

    .put((req, res) => {

        let articleToUpdate = _.capitalize(req.params.articleName);
        let newTitle = req.body.newTitle;
        let newContent = req.body.newContent;

        article.update(
            { title: articleToUpdate },
            { title: newTitle, content: newContent },
            {overwrite: true})
            .then((articleFound) => {
                if (articleFound) {
                    res.send('Article ' + articleToUpdate + ' updated');
                } else {
                    res.send('Article was not found');
                }
                
            })
            .catch((err) => {
                res.send(err);
            });
    })

    .patch((req, res) => {
        let articleToUpdate = _.capitalize(req.params.articleName);

        article.update(
            { title: articleToUpdate },
            {$set: req.body}
        ).then((articleFound) => {
            if (articleFound) {
                res.send('Article ' + articleToUpdate + ' updated');
            } else {
                res.send('Article was not found');
            }
            
        })
        .catch((err) => {
            res.send(err);
        });
    })
    

    .delete((req, res) => {
        let articleToDelete = _.capitalize(req.params.articleName);

        article.deleteOne({ title: articleToDelete }).then(() => {
            res.send('Article deleted!');
        }).catch((err) => {
            res.send(err);
        })
    });

//GET AN SPECIFIC ARTICLE
// app.get('/articles/:articleName', (req, res) => {

//     let reqArticle = _.upperCase(req.params.articleName);
//     console.log(reqArticle);

//     article.findOne({ title: reqArticle }).then((foundArticle) => {
//         if (foundArticle) {
//             res.send(foundArticle);   
//         } else {
//             console.log('Article was not found');
//         }
//     }).catch((err) => {
//         console.log(err);
//     });
// });


app.listen(3000, (req, res) => {
    console.log('Server on port 3000');
});