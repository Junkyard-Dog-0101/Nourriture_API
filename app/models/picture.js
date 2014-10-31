// app/models/picture.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PictureSchema = new Schema({
    picturePath: String
});

module.exports = mongoose.model('Picture', PictureSchema);
