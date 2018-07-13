const mongoose = require('mongoose');

// DB configuration
const db = require('../config/keys').mongoURI;

const connectToDatabase = () => {
  // Connecting to mongoDB
  mongoose
    .connect(
      db,
      { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(error => console.log('Error connecting to database: ', error));
};

module.exports = connectToDatabase;
