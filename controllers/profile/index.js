/** @type {User} */
const User = require('../../models/user');
/**
 * Responds with the profile of the currently logged in user
 * @param {*} req 
 * @param {*} res 
 */
const info = (req, res) => {
  if (req.user && req.user.id) {
    return res.send(User.groom(req.user));
  }
  res.status(404).send({ err: 'user not found' });
};

const get = (req, res) => {
  if (req.params.id) {
    return User.findOne({ username: req.params.id }).then((user, err) => {
      if (err) {
        return res.status(503).send(Object.assign(err, { error: 'error looking for user' }));
      }
      if (user === null || (user.deleted)) {
        return res.status(404).send({ err: 'user not found' });
      }
      return res.send(User.groom(user, user.private));
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
