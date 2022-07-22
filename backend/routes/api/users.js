const express = require('express');
const { requireAuth, restoreUser } = require('../../utils/auth');

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
        email: user.email
      });
    } else return res.json({});
  }
);

module.exports = router;
