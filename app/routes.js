var https = require('https');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    //GET https://www.strava.com/api/v3/athlete/activities

    https.request({
      host: 'www.strava.com',
      port: 443,
      path: '/api/v3/athlete/activities',
      accept: '*/*',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 83ebeabdec09f6670863766f792ead24d61fe3f9'
      }
    }, function(stravaCall) {
      console.log("statusCode: ", stravaCall.statusCode);
      // uncomment it for header details
      console.log("headers: ", stravaCall.headers);

      var buffer = ''
        , data
        , route

      stravaCall.on("data", function (chunk) {
        buffer += chunk;
      });

      stravaCall.on('end', function(d) {
        console.info('GET result:\n');
        process.stdout.write(d);
        console.info('\n\nCall completed');
      });

      stravaCall.on('error', function(d) {
        console.info('GET error:\n');
        process.stdout.write(d);
        console.info('\n\nCall completed');
      });
    });

    res.render('profile.ejs', {
      user: req.user
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  require('../lib/auth/strava/routes')(app, passport);
};
