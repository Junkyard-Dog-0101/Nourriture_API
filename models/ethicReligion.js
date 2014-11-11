// app/models/ethicReligion.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EthicReligionSchema = new Schema({
    name: String,
    description: String,
    pictures: [{
        type: Schema.Types.ObjectId,
        ref: 'Picture'
    }]
});

module.exports = mongoose.model('EthicReligion', EthicReligionSchema);
