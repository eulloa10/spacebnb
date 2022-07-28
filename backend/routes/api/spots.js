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
  check,
  query
} = require('express-validator');
const {
  handleValidationErrors
} = require('../../utils/validation');
const {
  Sequelize,
  Op
} = require('sequelize');
const user = require('../../db/models/user');


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
  .custom((value, {
    req
  }) => value.length < 50)
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

const validateSpotEdit = [
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
  .custom((value, {
    req
  }) => value.length < 50)
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
  handleValidationErrors
];

const validateReviewCreation = [
  check('review')
  .exists({
    checkFalsy: true
  })
  .withMessage('Review text is required'),
  check('stars')
  .exists({
    checkFalsy: true
  })
  .custom((value, {
    req
  }) => Number.isInteger(value) && value > 0 && value < 6)
  .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

const validateQueryParams = [
  query('page')
  .custom((page) => {
    if (!page) {
      return true;
    } else if (Number(page) >= 0 && Number(page) < 11) {
      return true;
    } else {
      return false;
    }
  })
  .withMessage('Page must be greater than or equal to 0'),
  query('size')
  .custom((size) => {
    if (!size) {
      return true;
    } else if (Number(size) >= 0 && Number(size) < 11) {
      return true;
    } else {
      return false;
    }
  })
  .withMessage('Size must be greater than or equal to 0'),
  query('minLat')
  .custom((minLat) => {
    if (!minLat || !isNaN(minLat)) {
      return true;
    } else {
      return false
    }
  })
  .withMessage('Minimum latitude is invalid'),
  query('maxLat')
  .custom((maxLat) => {
    if (!maxLat || !isNaN(maxLat)) {
      return true;
    } else {
      return false
    }
  })
  .withMessage('Maximum latitude is invalid'),
  query('minLng')
  .custom((minLng) => {
    if (!minLng || !isNaN(minLng)) {
      return true;
    } else {
      return false
    }
  })
  .withMessage('Minimum longitude is invalid'),
  query('maxLng')
  .custom((maxLng) => {
    if (!maxLng || !isNaN(maxLng)) {
      return true;
    } else {
      return false
    }
  })
  .withMessage('Maximum longitude is invalid'),
  query('minPrice')
  .exists()
  .custom((minPrice) => {
    if (Number(minPrice) >= 0) {
      return true;
    } else {
      return false;
    }
  })
  .withMessage('Minimum price must be greater than or equal to 0'),
  query('maxPrice')
  .exists()
  .custom((maxPrice) => {
    if (Number(maxPrice) >= 0) {
      return true;
    } else {
      return false;
    }
  })
  .withMessage('Maximum price must be greater than or equal to 0'),
  handleValidationErrors
];

// Return all spots
router.get(
  '/',
  validateQueryParams,
  async (req, res) => {

    let {
      page,
      size,
      minLat,
      maxLat,
      minLng,
      maxLng,
      minPrice,
      maxPrice
    } = req.query;

    if (page) {
      page = Number(page);
    } else {
      page = 0;
    }

    if (size) {
      size = Number(size);
    } else {
      size = 20;
    }

    let resultLimit = size;
    let resultOffset = size * (page - 1)

    // filters
    const where = {}

    if (minLat & maxLat) {
      where.lat = {
        [Op.between]: [Number(minLat), Number(maxLat)]
      }
    } else if (minLat) {
      where.lat = {
        [Op.gte]: Number(minLat)
      }
    } else if (maxLat) {
      where.lat = {
        [Op.lte]: Number(maxLat)
      }
    } else {
      where.lat = {
        [Op.ne]: null
      }
    }

    if (minLng & maxLng) {
      where.lng = {
        [Op.between]: [Number(minLng), Number(maxLng)]
      }
    } else if (minLng) {
      where.lng = {
        [Op.gte]: Number(minLng)
      }
    } else if (maxLng) {
      where.lng = {
        [Op.lte]: Number(maxLng)
      }
    } else {
      where.lng = {
        [Op.ne]: null
      }
    }

    where.price = {
      [Op.between]: [Number(minPrice), Number(maxPrice)]
    }

    const allSpots = await Spot.findAll({
      where,
      limit: resultLimit,
      offset: resultOffset
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
      attributes: {
        exclude: ['previewImage']
      },
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
        spotId: spotId
      },
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('review')), 'numReviews']
      ]
    })

    const reviewCount = reviews[0].dataValues.numReviews
    spotDetails.dataValues['numReviews'] = reviewCount

    const ratings = await Review.findAll({
      where: {
        spotId: spotId
      },
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('stars')), 'sumOfStars']
      ]
    })

    const ratingSum = ratings[0].dataValues.sumOfStars

    const avgStarRating = (ratingSum / reviewCount).toFixed(1)

    if (reviewCount === 0) {
      avgStarRating = 0;
    }

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
      ownerId: req.user.id,
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

    res.status(201);
    res.json(spot);


  }
);

// Edit a spot
router.put(
  '/:spotId',
  [requireAuth, validateSpotEdit],
  async (req, res) => {
    // console.log(req.user.id)
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    } = req.body;

    const spotId = Number(req.params.spotId);

    const spot = await Spot.findByPk(spotId, {
      attributes: {
        exclude: ['previewImage']
      }
    });

    if (!spot || (spot.id !== req.user.id)) {
      let err = new Error("Spot couldn't be found");
      err.status = 404;
      throw err;
    }

    const updatedSpot = await spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })

    res.status(200);
    res.json(updatedSpot);
  }
);

// Delete a spot
router.delete(
  '/:spotId',
  requireAuth,
  async (req, res) => {

    const spotId = Number(req.params.spotId);

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      let err = new Error("Spot couldn't be found");
      err.status = 404;
      throw err;
    };

    if (spot.id !== req.user.id) {
      let err = new Error("Forbidden");
      err.status = 403;
      throw err;
    };


    await Spot.destroy({
      where: {
        id: spotId
      }
    });


    res.status(200);
    res.json({
      "message": "Successfully deleted",
      "statusCode": res.statusCode
    });
  }
);

// Get all Reviews by a Spot's id
router.get(
  '/:spotId/reviews',
  async (req, res) => {

    const spotId = Number(req.params.spotId)

    const spotDetails = await Spot.findByPk(spotId);

    if (!spotDetails) {
      let err = new Error("Spot couldn't be found");
      err.status = 404;
      throw err;
    }

    const reviews = await Review.findAll({
      where: {
        spotId: spotId
      },
      include: [{
          model: User
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
    res.status(200);
    res.json({
      Reviews: reviews
    });
  }
);

// Get all Bookings by a Spot's id
router.get(
  '/:spotId/bookings',
  requireAuth,
  async (req, res) => {

    const spotId = Number(req.params.spotId)


    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      let err = new Error("Spot couldn't be found");
      err.status = 404;
      throw err;
    }

    res.status(200);

    if (spot.ownerId === req.user.id) {
      const bookings = await Booking.findAll({
        where: {
          spotId: spotId
        },
        include: {
          model: User
        }
      })
      res.json({
        "Bookings": bookings
      })
    } else {
      const limitedBookingInfo = await Booking.findAll({
        where: {
          spotId: spotId
        },
        attributes: [
          'spotId',
          'startDate',
          'endDate'
        ]
      })
      res.json({
        "Bookings": limitedBookingInfo
      })
    }
  }
);


// Create a Review for a Spot based on the Spot's id
router.post(
  '/:spotId/reviews',
  [requireAuth, validateReviewCreation],
  async (req, res) => {

    const spotId = Number(req.params.spotId)

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      let err = new Error("Spot couldn't be found");
      err.status = 404;
      throw err;
    }

    const existingReview = await Review.findOne({
      where: {
        userId: req.user.id,
        spotId: spot.id
      }
    });

    if (existingReview) {
      let err = new Error("User already has a review for this spot");
      err.status = 403;
      throw err;
    }

    const {
      review,
      stars
    } = req.body;

    const newReview = await Review.create({
      userId: req.user.id,
      spotId: spotId,
      review,
      stars
    })

    res.status(200);
    res.json(newReview);
  }
);

// Create a booking from a spot based on the Spot's id
router.post(
  '/:spotId/bookings',
  [requireAuth],
  async (req, res, next) => {

    const spotId = Number(req.params.spotId);
    const bookingStart = new Date(req.body.startDate);
    const bookingEnd = new Date(req.body.endDate);


    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      let err = new Error("Spot couldn't be found");
      err.status = 404;
      throw err;
    }

    if (spot.ownerId === req.user.id) {
      let err = new Error("Forbidden");
      err.status = 403;
      throw err;
    }


    const overlappingDates = await Booking.findOne({
      where: {
        spotId: spotId,
        startDate: {
          [Op.between]: [bookingStart, bookingEnd]
        }
      }
    })

    if (overlappingDates) {
      let err = new Error('Sorry, this spot is already booked for the specified dates');
      err.statusCode = 403;
      err.errors = {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking"
      }
      next(err);
    } else {
      const newBooking = await Booking.create({
        userId: req.user.id,
        spotId: spotId,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      })

      res.status(200);
      res.json(newBooking)
    }

  }
);

// Add an image for a Spot based on the Spot's id
router.post(
  '/:spotId/images',
  requireAuth,
  async (req, res) => {

    const spotId = Number(req.params.spotId)
    const userId = req.user.id

    const spot = await Spot.findByPk(spotId, {
      where: {
        ownerId: userId
      }
    });

    if (!spot) {
      let err = new Error("Spot couldn't be found");
      err.status = 404;
      throw err;
    }

    const newImage = await Image.create({
      imageableId: spotId,
      imageableType: 'spot',
      url: req.body.url,
    })

    res.status(200);
    res.json({
      id: newImage.id,
      imageableId: newImage.imageableId,
      url: newImage.url
    });
  }
);

module.exports = router;
