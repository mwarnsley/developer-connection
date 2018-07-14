const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../config/keys');
const passport = require('passport');

// Loading the user model from mongoose
const User = require('../../models/User');

// @route GET api/users
router.get('/', (req, res) => {
  res.json({ users: 'Marcus' });
});

// @route GET api/users/register
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.status(400).json({ email: 'Email already exists' });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });

        // Hashing the password to store in the database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) {
              throw error;
            }
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(error => console.log('Error saving user: ', error));
          });
        });
      }
    })
    .catch(error => console.log('Error getting user: ', error));
});

// @route GET api/users/login
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find the user by email address
  User.findOne({ email }).then(user => {
    // Check if user exists in database
    if (!user) {
      return res.status(404).json({ email: 'User not found!' });
    }

    // Check if the password is correct
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        /**
         * If user is found in the database we need to generate the token
         * We need to create the payload to send
         * We then need to sign the token
         */
        const payload = {
          id: user._id,
          name: user.name,
          avatar: user.avatar
        };
        jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (error, token) => {
          res.json({ success: true, jwtToken: `Bearer ${token}` });
        });
      } else {
        return res.status(400).json({ password: 'Incorrect Password' });
      }
    });
  });
});

// @route GET api/users/current
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
