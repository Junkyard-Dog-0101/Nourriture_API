var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 

var mongoose = require('mongoose');
mongoose.connect('127.0.0.1:1234');

var recipes = require('./routes/recipes');


app.use('/api/recipes', recipes);

app.listen(port);
