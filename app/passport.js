var User = require('../app/models/user');

module.exports = function(passport) {
  require('../lib/auth/strava/strava')(passport);

  // Serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize the user out of the session
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
