const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  let { name, email, password } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {

      return User.create({
        email: email,
        password: hashedPassword,
        name: name
      })
    })
    .then(user => {

      res.status(201).json({ message: 'User created!', user: user.name });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {

  let { email, password } = req.body;

  let loadedUser;
  User.findOne({where: { email: email }})
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 422;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.id
        },
        'IWantToCreateRestApiUsingExpressAndKnowIamGettingToWriteSpecialToken',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, user: loadedUser.name });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};