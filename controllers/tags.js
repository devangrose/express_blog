var express = require('express');
var router = express.Router();
var db = require('../models');
var async = require('async');


router.get('/', function (req, res) {
    db.tag.findAll().then(function (allTags) {
       res.render('tags/index', { tags: allTags }); 
    }).catch (function (err) {
        console.log(err);
        res.render('error');
    });
});

router.get('/:id', function(req,res) {
    db.tag.findOne({
        where: { id: req.params.id }, 
        include: [db.article]
    }).then(function (tag) {
        res.render('tags/show', { tag: tag });
    }).catch(function (err){
        console.log(err);
        res.render('error');
    });
});
router.delete('/:id', function (req, res) {
    db.tag.findOne({
        where: {id: req.params.id},
        include: [db.article]
    }).then(function (foundTag) {
        async.forEach(foundTag.articles, function(a, done){
            // Runs for each article
            // Remove the association from the join table
            foundTag.removeArticle(a).then(function(){
                done();  
            });
        },function(){
            // Runs when everything is done
            // Now that the references in the join table are gone, we can delete the tag
            db.tag.destroy({
                where: {id : req.params.id }
            }).then(function () {
                res.send('SUCCESSFULLY DELETED');
            }).catch(function (err){
                res.status(500).send('OH NOO');  
            });
            
        });
    }).catch(function (err) {
        console.log(err);
        res.status(500).send('OH NOOO');
    });
});
router.get('/edit/:id', function (req, res) {
    db.tag.findById(req.params.id).then(function (foundTag) {
        res.render('tags/edit',{tag: foundTag});
    });
});
router.put('/:id', function (req, res) {
    res.send(req.body);
});
module.exports = router;
