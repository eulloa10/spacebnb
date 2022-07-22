const express = require('express');

const {
  setTokenCookie
} = require('../../utils/auth');
const {
  User
} = require('../../db/models');

const {
  check
} = require('express-validator');

const {
  handleValidationErrors
} = require('../../utils/validation');

const router = express.Router();

const validateSignin = [
  check('email')
  .exists({
    checkFalsy: true
  })
  .isEmail()
  .withMessage('Email is required'),
  check('password')
  .exists({
    checkFalsy: true
  })
  .withMessage('Password is required'),
  handleValidationErrors
];

// Signin user
router.post(
  '/',
  validateSignin,
  async (req, res) => {

    const user = await User.login({
      credential: req.body.email,
      password: req.body.password
    })

    if (user) {
      const token = setTokenCookie(res, currentUser)
      res.status(200)
      res.json({
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "token": token
      })
    } else {
      res.status(401)
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }
  }
);

module.exports = router;
