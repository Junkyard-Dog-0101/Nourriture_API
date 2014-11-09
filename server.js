var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var recipes = require('./routes/recipes');
var ingredients = require('./routes/ingredients');
var users = require('./routes/users');

var app = express();
var port = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

var User = require('./app/models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/recipes', recipes);
app.use('/api/ingredients', ingredients);
app.use('/api/users', users);

mongoose.connect('127.0.0.1:27017');

app.listen(port);
