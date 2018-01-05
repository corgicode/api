/**
 * @file Route definition for the API endpoints
 * @requires express.Router
 * @author codecorgi
 * @namespace Router
 */

const routes = require('express').Router();
const controllers = require('../controllers');
const config = require('../config');
const ErrorSerializer = require('../serializers').error;

const submitController = controllers.submit;
const profileController = controllers.profile;
const challengeController = controllers.challenge;
const userController = controllers.user;
const commentController = controllers.comment;

const checkAdmin = [(req, res, next) => {
  if (req.get('apikey') === config.ADMIN_API_KEY) {
    return next();
  }
  return res.status(401).send(ErrorSerializer({ status: 401, title: 'A valid api key is needed for this request' }));
}];

const checkLogin = [(req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).send(ErrorSerializer({ status: 401, title: 'Must be logged in' }));
  }
  return next();
}];

const checkData = [(req, res, next) => {
  if (!req.body.data && req.body.data.attributes) {
    return res.status(422).send(ErrorSerializer({ status: 422, title: 'Missing data' }));
  }
  return next();
}];

const checkId = [(req, res, next) => {
  if (!req.params.id && (!req.body.data || req.body.data.id)) {
    return res.status(422).send(ErrorSerializer({ status: 422, title: 'Missing id' }));
  }
  return next();
}];

routes.post('/submit', submitController.new);
routes.get('/submit/get', submitController.get);
routes.get('/submit/all', submitController.getAll);
routes.get('/submit/single/:id', submitController.getById);
routes.get('/submit/comments/:id', submitController.getByIdWithComments);
routes.get('/submit/user/:user_id', submitController.findByUser);

routes.get('/profile/auth', checkLogin, profileController.info);
routes.get('/profile/id/:id', profileController.get);
routes.get('/profile/', profileController.get);
routes.get('/profile/:username', profileController.get);
routes.put('/profile', checkLogin, profileController.update);

// routes.get('/user/all', checkAdmin, userController.getAll);
routes.get('/users', checkAdmin, userController.getAll);
routes.get('/user/:id', checkAdmin, userController.findById);

routes.post('/challenge', checkAdmin, checkLogin, checkData, challengeController.post);
routes.get('/challenges', checkAdmin, challengeController.getAll);
routes.put('/challenges/:id', checkAdmin, checkLogin, checkId, checkData, challengeController.update);
routes.get('/challenges/:id', checkId, challengeController.getById);

routes.post('/comment', commentController.new);
routes.get('/comment/:id', commentController.getById);
routes.put('/comment/:id', commentController.update);
routes.delete('/comment/:id', commentController.delete);
routes.get('/comments/submission/:id', commentController.findBySubmission);
// routes.get('/comments/all', commentController.getAll);

routes.all('*', (req, res) => {
  res.status(403).json({ message: 'Please use a valid endpoint!' });
});

module.exports = routes;
