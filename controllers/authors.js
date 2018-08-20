var express = require('express');
var router = express.Router();

router.get('/', function (req, res){
    res.render('authors/index');
});
router.get('/new',function (req, res){
    res.render('authors/new');
});
router.get('/:id',function (req, res){
    res.render('authors/show');
});
router.post('/', function (req, res){
    res.send('posted boi');
});

module.exports = router;
