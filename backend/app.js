const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

const routes = require('./routes')

// logs information about requests and responses
app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use(routes);

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);

    if (JSON.stringify(err.errors) === JSON.stringify(["email must be unique"])) {
      _res.status(403);
      _res.json({
        message: "User already exists",
        statusCode: _res.statusCode,
        errors: {
          email: "User with that email already exists"
        }
      })
    }
    _res.status(400)
    _res.json({
      message: "Validation Error",
      statusCode: _res.statusCode,
      errors: err.errors,
    })
  }
  if (err.message === 'Sorry, this spot is already booked for the specified dates') {
    _res.status(403)
    _res.json({
      message: err.message,
      statusCode: _res.statusCode,
      errors: err.errors,
  })
}

// if (err.message === 'startDate after endDate') {
//   _res.status(400)
//   _res.json({
//     message: 'Validation Error',
//     statusCode: _res.statusCode,
//     errors: err.errors,
// }
// )}


  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
   res.json({
    message: err.message,
    statusCode: err.status,
    // stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
