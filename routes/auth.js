const router = require('express').Router();
const { signIn, signUp } = require('../controllers/authController.js');


router.post('/signin', signIn);
router.post('/signup', signUp);

module.exports = router;