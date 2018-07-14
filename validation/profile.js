const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  // Making sure the length of the handle is between 2 and 40
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }
  // Making sure the handle is not empty
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }
  // Making sure the status is not empty
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  // Making sure the skills is not empty
  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  // If the website is not empty, we need to make sure that it's a valid website
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  // Checking to make sure that the youtube url is valid
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  // Checking to make sure that the twitter url is valid
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  // Checking to make sure the facebook url is valid
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  // Checking to make sure the linkedin url is valid
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  // Checking to make sure the instagram url is valid
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
