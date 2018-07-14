const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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
        res.json({ msg: 'Success' });
        // If user is found we need to generate the token
      } else {
        return res.status(400).json({ password: 'Incorrect Password' });
      }
    });
  });
});

module.exports = router;
