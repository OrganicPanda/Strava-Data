var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  strava: {
    id: String,
    token: String,
    email: String,
    displayName: String
  }
});

module.exports = mongoose.model('User', userSchema);
