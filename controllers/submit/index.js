const SubmitModel = require('../../models/submit');
const ChallengeModel = require('../../models/challenge');
const SubmitSerializer = require('../../serializers').submit;
const ErrorSerializer = require('../../serializers').error;

const newSubmission = (req, res) => {
  const data = req.body.data || { attributes: {}};
  data._user = req.user._id;
  const submit = SubmitModel({ ...data.attributes, _user: req.user._id });
  console.log(submit);
  submit.save().then((doc) => {
      res.send(SubmitSerializer(doc));
  }).catch((err) => {
      res.status(503).send({ error: 'server error catched', err });
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
  SubmitModel.findById(req.params.id)
  .populate('challenge')
  .populate('comments')
  .populate('_user', 'codecorgi_url avatar flagged username')
  .then((doc) => {
    return res.send(SubmitSerializer(doc));
  }).catch((err) => {
    res.status(503).send({ error: 'server error catched', err });
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

const getForUserAndChallenge = (req, res) => {
  ChallengeModel.findOne({ number: req.params.number }).then(doc => {
    if (!doc) {
      res.status(404).send(ErrorSerializer({ status: 404, title: `Didn't find a challenge with number ${req.params.number}`}));
    }
    return SubmitModel.findOne({ challenge: doc.id, _user: req.user.id });
  }).then(doc => {
    if (!doc) {
      res.status(404).send(ErrorSerializer({ status: 404, title: `Didn't find a submission for challenge #${req.params.number}`}));
    }
    res.send(SubmitSerializer(doc));
  }).catch(err => {
    res.status(503).send(ErrorSerializer({ status: 503, title: 'Failed to retrieve a submission for user and challenge', ...err }));
  });
}

module.exports = {
  new: newSubmission,
  getAll,
  get,
  findByUser,
  getById,
  getByIdWithComments,
  getForUserAndChallenge,
};
