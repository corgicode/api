const auth = require('express').Router();
const Config = require('../config');
const passport = require('passport');

auth.get('/github',
  passport.authenticate('github', { scope: ['user:email'] }), () => null);

auth.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/user/signup' }),
(req, res) => {
  res.redirect(`/profile/?success=${Config.GITHUB_APP_NAME}`);
});

auth.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

auth.all('*', (req, res) => {
  res.status(403).json({ message: 'Please use a valid endpoint!' });
});

module.exports = auth;
