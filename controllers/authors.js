var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function (req, res){
    db.author.findAll().then(function(authors){
        console.log(authors);
        res.render('authors/index', {authors: authors});
    });
});
router.get('/new',function (req, res){
    res.render('authors/new');
});
router.get('/:id',function (req, res){
    db.author.findOne({
        where: {id : req.params.id },
        include: [db.article]
    }).then(function (foundAuthor){
        res.render('authors/show', {author: foundAuthor});
    }).catch(function (err){
        console.log(err);
        res.send("I can't find that Author");
    });
});
router.post('/', function (req, res){
    db.author.create(req.body).then(function(createdAuthor){
        res.redirect('/authors/' + createdAuthor.id);
    }).catch(function(err){
        console.log(err);
        res.send('derp');
    });
});

module.exports = router;
