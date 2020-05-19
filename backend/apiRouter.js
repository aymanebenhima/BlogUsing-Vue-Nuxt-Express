// Imports
const express = require('express');
const usersController = require('./controllers/usersController');
//const postsController = require('./controllers/postsController');

// Router
exports.router = (function () {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/users/register/').post(usersController.register);
    apiRouter.route('/users/login/').post(usersController.login);
/*     apiRouter.route('/users/about-me/').get(usersController.getUserProfile);
    apiRouter.route('/users/about-me').put(usersController.updateUserProfile);
 */
    // Messages routes
/*     apiRouter.route('/posts/new/').post(postsController.createPost);
    apiRouter.route('/posts/').get(postsController.listPosts); */

    return apiRouter;
})();