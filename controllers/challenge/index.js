const ChallengeModel = require('../../models/challenge');
const cache = require('../../config/redis');

const newChallenge = (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).send({ error: 'must login to send a submission' });
  }
  if (!req.body.data) {
    return res.status(422).send({ error: 'challenge data is missing' });
  }
  const data = req.body.data || {};
  data._user = req.user._id;

  const challenge = new ChallengeModel(data);
  challenge.save().then((doc) => {
    cache.del('cc_html_challenges');
    res.status(200).send({ data, doc });
  }).catch((err) => {
    res.status(500).send({ error: err });
  });
};

const update = (req, res) => {
  if (!req.params.id) {
    return res.status(422).send({ error: 'Missing challenge id' });
  }
  const data = req.body.data;
  ChallengeModel.findById(req.params.id).then((doc) => {
    const obj = Object.assign(doc, data);
    return obj.save();
  }).then((doc) => {
    cache.del('cc_html_challenges');
    cache.del(`cc_html_challenge_${doc.number}`);
    res.send({ doc });
  });
};

const getAll = (req, res) => {
  ChallengeModel.find({}, (err, list) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Retrieved submissions', list.length);
      res.send(list);
    }
  });
};

const getById = (req, res) => {
  if (!req.params.id) {
    return res.status(422).send({ error: 'Missing challenge id' });
  }
  ChallengeModel.findById(req.params.id).then((doc) => {
    console.log('Retrieved challenge: ', req.params.id);
    return res.send({ doc });
  }).catch((err) => {
    console.log(err);
    return res.status(503).send(err);
  });
};

module.exports = {
  new: newChallenge,
  getAll,
  getById,
  update,
};
