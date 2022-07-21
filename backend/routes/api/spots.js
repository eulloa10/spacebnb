const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot } = require('../../db/models');

const router = express.Router();

// Return all spots
router.get(
  '/',
  async (req, res) => {
    const allSpots = await Spot.findAll({
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
      ]
    });
    res.json({"Spots":allSpots})

    // {
    //   "id": 1,
    //   "ownerId": 1,
    //   "address": "123 Disney Lane",
    //   "city": "San Francisco",
    //   "state": "California",
    //   "country": "United States of America",
    //   "lat": 37.7645358,
    //   "lng": -122.4730327,
    //   "name": "App Academy",
    //   "description": "Place where web developers are created",
    //   "price": 123,
    //   "createdAt": "2021-11-19 20:39:36",
    //   "updatedAt": "2021-11-19 20:39:36",
    //   "previewImage": "image url"
    // }
  }
);

module.exports = router;
