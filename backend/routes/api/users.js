const express = require('express');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot } = require('../../db/models')

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
        token: req.cookies.token
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

module.exports = router;
