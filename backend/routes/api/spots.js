const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Image, Spot, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


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
    res.status(200);
    res.json({
      "Spots": allSpots
    });
  }
);

// Return spot details by id
router.get(
  '/:id',
  async (req, res) => {
    const spotDetails = await Spot.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Review
        },
        {
          model: Image,
          attributes: [
            'id',
            'imageableId',
            'url'
          ]
        },
        {
          model: User,
          as: 'Owner'
        }
      ]

    });
    res.status(200);
    res.json({
      spotDetails
    });
  }
);

module.exports = router;
