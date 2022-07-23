const express = require('express');

const {
  setTokenCookie,
  requireAuth
} = require('../../utils/auth');
const {
  User,
  Image,
  Spot,
  Review
} = require('../../db/models');

const {
  check
} = require('express-validator');
const {
  handleValidationErrors
} = require('../../utils/validation');
const {
  Sequelize
} = require('sequelize');


const router = express.Router();

const validateSpotCreation = [
  check('address')
  .exists({
    checkFalsy: true
  })
  .withMessage('Street address is required'),
  check('city')
  .exists({
    checkFalsy: true
  })
  .withMessage('City is required'),
  check('state')
  .exists({
    checkFalsy: true
  })
  .withMessage('State is required'),
  check('country')
  .exists({
    checkFalsy: true
  })
  .withMessage('Country is required'),
  check('lat')
  .exists({
    checkFalsy: true
  })
  .withMessage('Latitude is not valid'),
  check('lng')
  .exists({
    checkFalsy: true
  })
  .withMessage('Longitude is not valid'),
  check('name')
  .exists({
    checkFalsy: true
  })
  .custom((value, { req }) => value.length < 50)
  .withMessage('Name must be less than 50 characters'),
  check('description')
  .exists({
    checkFalsy: true
  })
  .withMessage('Description is required'),
  check('price')
  .exists({
    checkFalsy: true
  })
  .withMessage('Price per day is required'),
  check('previewImage')
  .exists({
    checkFalsy: true
  })
  .withMessage('Preview image url is required'),
  handleValidationErrors
];

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

    const spotId = Number(req.params.id)

    const spotDetails = await Spot.findByPk(spotId, {
      include: [{
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


    if (!spotDetails) {
      let err = new Error("Spot couldn't be found");
      err.status = 404;
      throw err;
    }

    const reviews = await Review.findAll({
      where: {
        reviewableId: spotId
      },
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('review')), 'numReviews']
      ]
    })

    const reviewCount = reviews[0].dataValues.numReviews
    spotDetails.dataValues['numReviews'] = reviewCount

    const ratings = await Review.findAll({
      where: {
        reviewableId: spotId
      },
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('stars')), 'sumOfStars']
      ]
    })

    const ratingSum = ratings[0].dataValues.sumOfStars

    const avgStarRating = (ratingSum / reviewCount).toFixed(1)

    spotDetails.dataValues['avgStarRating'] = avgStarRating;

    res.status(200);
    res.json(spotDetails);
  }
);

// Create a new spot
router.post(
  '/',
  [requireAuth, validateSpotCreation],
  async (req, res) => {

    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage
    } = req.body;

    const spot = await Spot.create({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage
    });

    res.json(spot)


  }
);


module.exports = router;
