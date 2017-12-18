const SubmitModel = require('../../models/submit');

const newSubmission = (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).send({ error: 'must login to send a submission' });
  }
  if (!req.body.data || !req.body.data.challenge) {
    return res.status(422).send({ error: 'challenge id is missing' });
  }
  const data = req.body.data || {};
  data._user = req.user._id;
  let promise;
  // check if the user has a submission already, otherwise create a new one
  const query = { _user: req.user._id, challenge: req.body.data.challenge };
  if (req.body.data._id) {
    promise = SubmitModel.findOne(query).then((doc) => {
      console.log(doc);
      const obj = Object.assign(doc, data);
      return obj.save();
    });
  } else {
    const submission = new SubmitModel(data);
    promise = submission.save();
  }
  return promise.then((err, doc) => {
    res.status(200).send({ data, doc });
  }).catch((err) => {
    res.status(500).send({ error: err });
  });
};

const findByUser = (req, res) => {
  if (!req.params.user_id) {
    return res.status(422).send({ error: 'missing user id' });
  }
  return SubmitModel.find({ _user: req.params.user_id }).populate('challenge').then((docs) => {
    console.log(`Retrieved submissions for user: ${req.params.user_id} `, docs.length);
    res.send(docs);
  }, (err) => {
    res.status(500).send({ err });
  });
};

const getAll = (req, res) => {
  SubmitModel.find({}, (err, list) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Retrieved submissions', list.length);
      res.send(list);
    }
  });
};

const get = (req, res) => {
  const query = {};
  if (req.query.challenge_id) {
    query.challenge = req.query.challenge_id;
  }
  if (req.query.self && req.user._id) {
    query._user = req.user.id;
  }
  SubmitModel.findOne(query, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(503).send(err);
    } else {
      console.log('Retrieved submission: ', query);
      return res.send(doc);
    }
  });
};

const getById = (req, res) => {
  if (!req.params.id) {
    return res.status(422).send({ error: 'missing submit id' });
  }
  SubmitModel.findById(req.params.id)
  .populate('challenge')
  .populate('comments')
  .populate('_user', 'codecorgi_url avatar flagged username')
  .then((doc) => {
    res.send(doc);
  });
};

const getByIdWithComments = (req, res) => {
  if (!req.params.id) {
    return res.status(422).send({ error: 'missing submit id' });
  }
  SubmitModel.findById(req.params.id)
  .populate('challenge comments')
  .populate('_user', 'codecorgi_url avatar flagged username')
  .then((doc) => {
    res.send(doc);
  });
};

module.exports = {
  new: newSubmission,
  getAll,
  get,
  findByUser,
  getById,
  getByIdWithComments,
};
