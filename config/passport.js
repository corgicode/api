/**
 * Initializes the configuration for passport
 * and defines where users are serialized and
 * deserialized
 *
 * https://github.com/dvidsilva/passport-examples
 */
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const Config = require('../config');
const User = require('../models/user');
const _ = require('lodash');
const redis = require('../config/redis');
const Emails = require('../emails');

function translateUser(profile) {
  return {
    github_id: profile.id,
    email: profile.emails[0].value,
    name: profile.displayName,
    username: profile.username,
    avatar: { url: _.result(profile, '_json.avatar_url') },
    accounts: { github: _.result(profile, '_json') },
    profile: {
      github_url: _.result(profile, '_json.html_url'),
      tagline: _.result(profile, '_json.bio'),
      company: _.result(profile, '_json.company'),
      location: _.result(profile, '_json.location'),
      hireable: _.result(profile, '_json.hireable'),
      public_repos: _.result(profile, '_json.public_repos'),
      github_followers: _.result(profile, '_json.followers'),
    },
  };
}

module.exports = (app) => {
  app.use(session({ secret: 'fef973c180b446fc35306bdfaabe428871d94a17',
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
      client: redis,
    }),
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log('serialize user', user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('Deserialize user, id: ', id);
    User.findById(id).then((user, err) => {
      if (!err) {
        return done(null, user);
      }
      console.error('found error when deserializing user:', id);
      done(err, {});
    });
  });

  passport.use(new GitHubStrategy({
    clientID: Config.GITHUB_CLIENT_ID,
    clientSecret: Config.GITHUB_CLIENT_SECRET,
    callbackURL: Config.GITHUB_CALLBACK_URL,
    scope: ['user:email'],
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ github_id: profile.id }, (err, user) => {
      if (err) {
        return console.error('found error when looking for user in db', user);
      }
      if (user) {
        return done(null, user);
      }
      user = new User(translateUser(profile));
      user.save((err, user) => {
        if (err) {
          return console.error('Error creating user', err);
        }
        Emails.addSubscriber(user.email, { firstName: user.name });
        process.nextTick(() => done(null, user));
      });
    });
  }));
}
