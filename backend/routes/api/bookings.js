const express = require('express');

const {
  setTokenCookie,
  requireAuth
} = require('../../utils/auth');
const {
  User,
  Image,
  Spot,
  Review,
  Booking
} = require('../../db/models');

const {
  check
} = require('express-validator');
const {
  handleValidationErrors
} = require('../../utils/validation');
const {
  Sequelize, Op
} = require('sequelize');
const user = require('../../db/models/user');

const router = express.Router();

// Update a booking
router.put(
  '/:bookingId',
  [requireAuth],
  async (req, res, next) => {

    const { user } = req;
    const bookingId = Number(req.params.bookingId);
    const bookingStart = new Date(req.body.startDate);
    const bookingEnd = new Date(req.body.endDate);

    const booking = await Booking.findOne({
      where: {
        userId : user.id,
        id: bookingId
      }
    })

    if (!booking) {
      let err = new Error("Booking couldn't be found");
      err.status = 404;
      throw err;
    }

    const dateToday = new Date();

    if (booking.endDate < dateToday) {
      let err = new Error("Past bookings can't be modified");
      err.status = 403;
      throw err;
    }

    if (bookingStart > bookingEnd) {
      let err = new Error('startDate after endDate');
      err.status = 400;
      err.errors = {
        endDate: "endDate cannot come before startDate",
      }
      throw err;
    }

    const overlappingDates = await Booking.findOne({
      where: {
        id: bookingId,
        startDate: {[Op.between] : [bookingStart , bookingEnd ]}
      }
    })

    if (overlappingDates) {
      let err = new Error('Sorry, this spot is already booked for the specified dates');
      err.status = 403;
      err.errors = {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
      next(err);
    } else {
      const updatedBooking = await booking.update({
        startDate: bookingStart,
        endDate: bookingEnd
      })

      res.status(200);
      res.json(updatedBooking);
    }
  }
);

// Delete a booking
router.delete(
  '/:bookingId',
  [requireAuth],
  async (req, res, next) => {

    const { user } = req;
    const bookingId = Number(req.params.bookingId);
    const bookingStart = new Date(req.body.startDate);
    const bookingEnd = new Date(req.body.endDate);

    const dateToday = new Date();
    if (dateToday >= bookingStart && dateToday <= bookingEnd) {
      let err = new Error("Bookings that have been started can't be deleted");
      err.status = 403;
      throw err
    }

    //Check if booking exists
    const bookingExists = await Booking.findOne({
      where: {
        id: bookingId
      }
    });

    if (!bookingExists) {
      let err = new Error("Booking couldn't be found");
      err.status = 404;
      throw err;
    }

    // Check to make sure booking belongs to current user
    const bookingByUser = await Booking.findOne({
      where: {
        userId: user.id,
        id: bookingId
      }
    });

    // Check to make sure booking spot belongs to current user
    const bookingByOwner = await Booking.findOne({
      where: {
        id: bookingId
      },
      include: {
        model: Spot,
        where: {
        ownerId: user.id
        }
      }
    });

    if (bookingByUser || bookingByOwner) {
      await Booking.destroy({
        where: {
          id: bookingId
        }
      });

      res.status(200)
      res.json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
      })
    } else {
      let err = new Error("Forbidden");
      err.status = 403;
      throw err
    }
  }
);




module.exports = router;
