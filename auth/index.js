const auth = require('express').Router();
const Config = require('../config');
const passport = require('passport');

auth.get('/github',
  passport.authenticate('github', { scope: ['user:email'] }), () => null);

auth.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/app#!/signup' }),
(req, res) => {
  res.redirect(`/app#!/profile/?success=${Config.GITHUB_APP_NAME}`);
});

auth.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = auth;
