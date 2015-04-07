var mongoose = require('mongoose');

var BillSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    }
});

module.exports = mongoose.model('Bill', BillSchema);
