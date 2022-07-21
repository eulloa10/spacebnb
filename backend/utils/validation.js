const { response } = require('express');
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {

  const validationErrors = validationResult(req);
  const allErrors = {};

  for (let i = 0; i < validationErrors.errors.length; i ++) {
    let currentParam = validationErrors.errors[i].param;
    let currentMsg = validationErrors.errors[i].msg;

    allErrors[currentParam] = currentMsg
  }

  if (!validationErrors.isEmpty()) {
    _res.status(400)
    return _res.json({
      "message": "Validation Error",
      "statusCode": "400",
      "errors" : allErrors
    });

  }
  next();
};

module.exports = {
  handleValidationErrors
};
