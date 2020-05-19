// Imports
var bcrypt  = require('bcrypt');
var jwt     = require('jsonwebtoken');
var User  = require('../models/user');

// Routes
module.exports = {
  register: function(req, res) {

    // Parameters
    var email     = req.body.email;
    var username  = req.body.username;
    var password  = req.body.password;
    var aboutme   = req.body.aboutme;

    if (email == null || username == null || password == null)
      return res.status(400).json({ 'error': 'missing parameters'});

    User.findOne({
      attributes: ['email'],
      where: { email: email}
    })
    .then(function(userFound) {
      if (!userFound)

        bcrypt.hash(password, 5, function(err, bcryptedPassword) {
          var newUser = User.create({
            email: email,
            username: username,
            password: bcryptedPassword,
            aboutme: aboutme,
            isAdmin: 0
          })
          .then(function(newUser) {
            return res.status(201).json({
              'userId': newUser.id
            })
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'cannot add user'});
          });
        });

      else
        return res.Status(409).json({ 'error': 'user already exist' });
    })
    .catch(function(err) {
      return res.status(500).json({ 'error': 'unable to verify user' });
    });
  },
  login: function(req, res) {

  }
}