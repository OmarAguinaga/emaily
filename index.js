const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access tocken', accessToken);
      console.log('refresh tocken', refreshToken);
      console.log('profile', profile);
    }
  )
);

/**
 * Attempt to authenticate the user going to the routh /auth/google with the
 * passport strategy 'google'.
 * [scope] asking for the user's profile information and email from google
 */

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

/**
 * Take the code and exchange it for some information using passport strategy
 */
app.get('/auth/google/callback', passport.authenticate('google'));

/**
 * configure port number for development and production
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT);
