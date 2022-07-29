const express = require('express');

const {
  requireAuth
} = require('../../utils/auth');
const {
  Image,
  Review
} = require('../../db/models');

const {
  check
} = require('express-validator');
const {
  handleValidationErrors
} = require('../../utils/validation');

const router = express.Router();

const validateReviewEdit = [
  check('review')
  .exists({
    checkFalsy: true
  })
  .withMessage('Review text is required'),
  check('stars')
  .exists({
    checkFalsy: true
  })
  .custom((value, { req }) => Number.isInteger(value) && value > 0 && value < 6)
  .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

// Edit a review
router.put(
  '/:reviewId',
  [requireAuth, validateReviewEdit],
  async (req, res) => {

    const { user } = req;
    const reviewId = Number(req.params.reviewId);

    const review = await Review.findOne({
      where: {
        userId : user.id,
        id: reviewId
      }
    })

    if (!review) {
      let err = new Error("Review couldn't be found");
      err.status = 404;
      throw err;
    }

    const updatedReview = await review.update({
      review: req.body.review,
      stars: Number(req.body.stars)
    })

    res.status(200);
    res.json(updatedReview);
  }
);

// Delete a review
router.delete(
  '/:reviewId',
  requireAuth,
  async (req, res) => {

    const { user } = req;
    const reviewId = Number(req.params.reviewId);

    const review = await Review.findOne({
      where: {
        id: reviewId
      }
    })

    if (!review) {
      let err = new Error("Review couldn't be found");
      err.status = 404;
      throw err;
    }

    if (review.userId !== user.id) {
      let err = new Error('Forbidden');
      err.status = 404;
      throw err;
    }

    await Review.destroy({
      where: {
        id: reviewId
      }
    });


    res.status(200);
    res.json({
      "message": "Successfully deleted",
      "statusCode": res.statusCode
    });
  }
);

// Add an image to a review based on the review id
router.post(
  '/:reviewId/images',
  requireAuth,
  async (req, res) => {

    const reviewId = Number(req.params.reviewId)
    const userId = req.user.id

    const review = await Review.findByPk(reviewId, {
      where: {
        userId: userId
      }
    });

    if (!review) {
      let err = new Error("Review couldn't be found");
      err.status = 404;
      throw err;
    }

    const imgCount = await Image.findAll({
      where: {
        imageableId: reviewId,
        imageableType: 'review'
      }
    })

    if (imgCount.length < 10) {
      const newImage = await Image.create({
        imageableId: reviewId,
        imageableType: 'review',
        url: req.body.url,
      })

      res.status(200);
      res.json({
        id: newImage.id,
        imageableId: newImage.imageableId,
        url: newImage.url
      });

    } else {
      let err = new Error("Maximum number of images for this resource was reached");
      err.status = 403;
      throw err
    }
  }
);

module.exports = router;
