const express = require('express');
const mongoose = require('mongoose');

const app = express();

// DB import
const db = require('./db/db.js');

// Setting the port from the environment OR using Port:5000
const PORT = process.env.PORT || 5000;

db();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
