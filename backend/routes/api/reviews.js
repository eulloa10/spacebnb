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

module.exports = router;
