const passport = require('passport');

module.exports = app => {
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

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
