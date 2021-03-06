// Require needed node modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');


// Global variables
var app = express();
var db = require('./models');

// Set and use statements
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));

// Include contollers/routers
app.use('/articles',require('./controllers/articles'));
app.use('/authors', require('./controllers/authors'));
app.use('/comments',require('./controllers/comments.js'));
app.use('/tags', require('./controllers/tags.js'));

// Define routes
app.get('/', function (req, res) {
    res.render('home');
});
app.get('*', function (req, res) {
    res.render('error');
});

// listen on port 3000
app.listen(3000, function (){
    console.log('ONE OF US, ONE OF US, ONE OF US');
});
