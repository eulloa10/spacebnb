const express = require('express');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Review, Image, User, Booking } = require('../../db/models')

const router = express.Router();

// Get current user
router.get(
  '/',
  [requireAuth, restoreUser],
  (req, res) => {
    const { user } = req;

    if (user) {
      return res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // token: req.cookies.token
      });
    } else return res.json({});
  }
);

// Get all spots owned(created) by the current user
router.get(
  '/spots',
  [requireAuth, restoreUser],
  async (req, res) => {
    const { user } = req;

    const userSpots = await Spot.findAll({
      attributes: [
        'id',
        'ownerId',
        'address',
        'city',
        'state',
        'country',
        'lat',
        'lng',
        'name',
        'description',
        'price',
        'createdAt',
        'updatedAt',
        'previewImage'
      ],
      where: {ownerId: user.id}
    })

    res.json({
      Spots: userSpots
    })
  }
);

// Get all reviews written by the current user
router.get(
  '/reviews',
  [requireAuth, restoreUser],
  async (req, res) => {
    const { user } = req;

    const reviews = await Review.findAll({
      where: {userId: user.id},
      include: [
        {
          model: User
        },
        {
          model: Spot,
          attributes: {
            exclude: [
              'description',
              'previewImage',
              'createdAt',
              'updatedAt'
            ]
          }
        },
        {
          model: Image,
          attributes: {
            exclude: [
               'imageableType',
               'createdAt',
               'updatedAt'
            ]
          }
        }
      ]
    })

    res.json({
      Reviews: reviews
    })
  }
);

// Get all bookings that the current user has made
router.get(
  '/bookings',
  [requireAuth, restoreUser],
  async (req, res) => {
    const { user } = req;

    const bookings = await Booking.findAll({
      where: {userId: user.id},
      include: {
        model: Spot,
        attributes: {
          exclude: [
            'description',
            'createdAt',
            'updatedAt'
          ]
        }
      }
    })

    res.json({
      Bookings: bookings
    })
  }
);

module.exports = router;
