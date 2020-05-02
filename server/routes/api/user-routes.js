const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getSingleUser,
  saveShow,
  updateShow,
  deleteShow,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').get(getAllUsers).post(createUser).put(authMiddleware, saveShow);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:username').get(getSingleUser);

// is post or put the most appropriate?
router.route('/shows/:id').put(authMiddleware, updateShow);

router.route('/shows/:id').delete(authMiddleware, deleteShow);

module.exports = router;
