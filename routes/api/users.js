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

// @route POST api/users/register
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

module.exports = router;
