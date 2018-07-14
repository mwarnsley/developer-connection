const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Using validation to make sure that the email field being sent is a valid email
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Using validation to make sure that the email field being sent is not empty
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  // Using validation to make sure that the password field being sent is not empty
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
