// Requiring in all of the modules
const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// DB import
const db = require('./db/db.js');

// Setting the port from the environment OR using Port:5000
const PORT = process.env.PORT || 5000;

// Initialize the database
db();

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Using the routes for the application
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Starting the application to listen on the specified port
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
