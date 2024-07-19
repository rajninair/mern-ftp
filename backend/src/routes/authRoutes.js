const express = require('express');
const authController = require('../controllers/authController');
const checkAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/verify-token', checkAuth, authController.verifyToken);
router.post('/logout', authController.logout);

module.exports = router;
