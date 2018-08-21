var express = require('express');
var router = express.Router();
var db = require('../models');
var async = require('async');



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
        include: [db.author, db.comment, db.tag]
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
        var tags = [];
        if(req.body.tags){
            tags = req.body.tags.split(',');
        }
        console.log(tags);
        if(tags.length > 0){
            async.forEach(tags, function (t, done){
                // This code runs for each individual tag we need to add
                db.tag.findOrCreate({
                    where: {name: t.trim()}
                }).spread(function (newTag, wasCreated){
                    createdArticle.addTag(newTag).then(function (){
                        done();
                    });
                });
            },function (){
                // This code runs when everything is done!
                res.redirect('/articles/' + createdArticle.id);
            });
        }
        else {
            res.redirect('/articles/' + createdArticle.id);
        }
    }).catch(function(err){
        console.log(err);
        res.send('noooo');
    });
});

module.exports = router;
