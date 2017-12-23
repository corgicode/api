/**
 * @file Route definition for the API endpoints
 * @requires express.Router
 * @author codecorgi
 * @namespace Router
 */

const routes = require('express').Router();
const controllers = require('../controllers');
const config = require('../config');


const submitController = controllers.submit;
const profileController = controllers.profile;
const challengeController = controllers.challenge;
const userController = controllers.user;
const commentController = controllers.comment;


const checkAdmin = [(req, res, next) => {
  if (req.get('apikey') === config.ADMIN_API_KEY) {
    return next();
  }
  return res.status(401).send({ message: 'A valid api key is needed for this request' });
}];

routes.post('/submit', submitController.new);
routes.get('/submit/get', submitController.get);
routes.get('/submit/all', submitController.getAll);
routes.get('/submit/single/:id', submitController.getById);
routes.get('/submit/comments/:id', submitController.getByIdWithComments);
routes.get('/submit/user/:user_id', submitController.findByUser);

routes.get('/profile/info', profileController.info);
routes.get('/profile/info/:id', profileController.get);
routes.put('/profile', profileController.update);

// routes.get('/user/all', checkAdmin, userController.getAll);
routes.get('/users', checkAdmin, userController.getAll);
routes.get('/user/:id', checkAdmin, userController.findById);

routes.post('/challenge', checkAdmin, challengeController.new);
routes.get('/challenge/all', challengeController.getAll);
routes.put('/challenge/:id', checkAdmin, challengeController.update);
routes.get('/challenge/:id', checkAdmin, challengeController.getById);

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
