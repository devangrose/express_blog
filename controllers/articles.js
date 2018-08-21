var express = require('express');
var router = express.Router();
var db = require('../models');
router.get('/', function (req, res){
    db.article.findAll({
        include: [db.author]
    }).then(function (articles){
        res.render('articles/index', {articles: articles});
    });
});
router.get('/new',function (req, res){
    db.author.findAll().then(function (allAuthors){
        res.render('articles/new',{authors: allAuthors});
    }).catch(function(err){
        console.log(err);
        res.send('oops');
    });
});
router.get('/:id',function (req, res){
    db.article.findOne({
        where: {id : req.params.id },
        include: [db.author, db.comment]
    }).then(function (foundArticle){
        db.author.findAll().then(function(allAuthors){
            res.render('articles/show', {article: foundArticle, authors: allAuthors});
        }).catch(function (err){
            console.log(err);
            res.render('error');
        });
    }).catch(function (err){
        console.log(err);
        res.render('error');
    });
});
router.post('/', function (req, res){
    console.log(req.body);
    db.article.create(req.body).then(function(createdArticle){
        res.redirect('/articles/' + createdArticle.id);
    }).catch(function(err){
        console.log(err);
        res.send('noooo');
    });
});

module.exports = router;
