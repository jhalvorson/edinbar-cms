const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy());

passport.use(new GoogleStrategy({
    clientID: '1001191692854-t3dg47n9vteqrd371l4ba4pm8l61adat.apps.googleusercontent.com',
    clientSecret: 'XRjS1mugTqqM5yy6WRHpgCfw',
    callbackURL: "//localhost:7777/auth/google/callback"
  },
  // function(accessToken, refreshToken, profile, done) {
  //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //      return done(err, user);
  //    });
  // }

  function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    console.log(`ID: ${profile.id}`);

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
      }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
