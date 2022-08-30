const router = require('express').Router();

const bookingsRouter = require('./bookings.js');
const imagesRouter = require('./images.js');
const reviewsRouter = require('./reviews.js');
const sessionRouter = require('./session.js');
const signinRouter = require('./signin.js');
const signupRouter = require('./signup.js');
const spotsRouter = require('./spots.js');
const usersRouter = require('./currentUser.js');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/signin', signinRouter)
router.use('/bookings', bookingsRouter);
router.use('/images', imagesRouter);
router.use('/reviews', reviewsRouter);
router.use('/session', sessionRouter);
router.use('/signup', signupRouter);
router.use('/spots', spotsRouter);
router.use('/me', usersRouter);

// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });


module.exports = router;
