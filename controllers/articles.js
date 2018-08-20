var express = require('express');
var router = express.Router();
var db = require('../models');
router.get('/', function (req, res){
    res.render('articles/index');
});
router.get('/new',function (req, res){
    res.render('articles/new');
});
router.get('/:id',function (req, res){
    res.render('articles/show');
});
router.post('/', function (req, res){
    res.send('posted boi');
});

module.exports = router;
