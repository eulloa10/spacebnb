const express = require('express');

const {
  requireAuth
} = require('../../utils/auth');
const {
  Image,
  Spot,
  Review
} = require('../../db/models');

const router = express.Router();

// Delete an image
router.delete(
  '/:imageId',
  requireAuth,
  async (req, res) => {

    const { user } = req;
    const imageId = Number(req.params.imageId);

    const image = await Image.findOne({
      where: {
        id: imageId
      }
    })

    if (!image) {
      let err = new Error("Image couldn't be found");
      err.status = 404;
      throw err;
    }

    // User must be owner of spot
    const spot = await Spot.findOne({
      where: {
        ownerId: user.id
      }
    })

    // User must have written review
    const review = await Review.findOne({
      where: {
        userId: user.id
      }
    })

    if (image.imageableId === spot.id && image.imageableType === 'spot') {
      await Image.destroy({
        where: {
          id: imageId
        }
      });
    } else if (image.imageableId === review.id && image.imageableType === 'review') {
      await Image.destroy({
        where: {
          id: imageId
        }
      });
    } else {
      let err = new Error("Forbidden");
      err.status = 403;
      throw err;
    }
    res.status(200);
    res.json({
      "message": "Successfully deleted",
      "statusCode": res.statusCode
    });
  }
);

module.exports = router;
