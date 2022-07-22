const router = require('express').Router();
const currentUserRouter = require('./currentUser.js')
// const bookingsRouter = require('./bookings.js');
// const imagesRouter = require('./images.js');
// const reviewsRouter = require('./reviews.js');
// const sessionRouter = require('./session.js');
// const signinRouter = require('./signin.js');
// const signupRouter = require('./signup.js');
const spotsRouter = require('./spots.js');
const usersRouter = require('./users.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');


router.use(restoreUser);

router.use('/me', currentUserRouter);
// router.use('/bookings', bookingsRouter);
// router.use('/images', imagesRouter);
// router.use('/reviews', reviewsRouter);
// router.use('/session', sessionRouter);
// router.use('/signin', signinRouter);
// router.use('/signup', signupRouter);
router.use('/spots', spotsRouter);
router.use('/users', usersRouter);


// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});


module.exports = router;
