const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot } = require('../../db/models');

const router = express.Router();

// Return all spots owned (created) by the current user
router.get(
  '/spots',
  // requireAuth,
  async (req, res) => {
    console.log('REQ', req)
    // const userSpots = await Spot.findbyPK()

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

  }
);


module.exports = router;
