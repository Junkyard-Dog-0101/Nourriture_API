var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var recipes = require('./routes/recipes');
var app = express();
var port = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/recipes', recipes);

mongoose.connect('127.0.0.1:1234');

app.listen(port);
