var mongoose = require('mongoose');

var NotificationSchema = new mongoose.Schema({
  content: String,
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  target: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  targetType: {
    type: String,
    enum: ['message', 'dish', 'recipe', 'friend', 'rank'],
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
  /*
    if it's a message the target is not the message id it's the user is who send the message
    if it's a friend, the taget is the user id
  */
});

module.exports = mongoose.model('Notification', NotificationSchema);

/* todo : add get read unread */
