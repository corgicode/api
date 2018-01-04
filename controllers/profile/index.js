const User = require('../../models/user');
const UserSerializer = require('../../serializers').users;
const ProfileSerializer = require('../../serializers').profile;

const info = (req, res) => {
  if (req.user && req.user.id) {
    return res.send(UserSerializer(User.auth(req.user)));
  }
};

const get = (req, res) => {
  if (req.params.username) {
    return User.findOne({ username: req.params.username }).then((user, err) => {
      if (err) {
        return res.status(503).send(Object.assign(err, { error: 'error looking for user' }));
      }
      if (user === null || (user.deleted)) {
        return res.status(404).send({ err: 'user not found' });
      }
      return res.send(ProfileSerializer(User.tidy(req.user)));
    });
  }
  return res.status(422).send({ error: 'missing user id' });
};

const update = (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(503).send({ error: 'must be logged in to update profile' });
  }
  if (!req.body || !req.body.data) {
    return res.status(422).send({ error: 'missing data' });
  }
  const data = req.body.data || {};

  User.findByIdAndUpdate(req.user.id, {$set: data}, {upsert: true})
  .then((doc) => {
    res.send(doc);
  }).catch((err) => {
    res.status(503).send({ error: 'server error catched', err });
  });
};

module.exports = {
  info,
  get,
  update,
};
