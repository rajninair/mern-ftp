const express = require('express');
const ftpServerController = require('../controllers/ftpServerController');
const checkAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', checkAuth, ftpServerController.getFtpServers);
router.post('/', checkAuth, ftpServerController.createFtpServer);
router.put('/:id', checkAuth, ftpServerController.updateFtpServer);
router.delete('/:id', checkAuth, ftpServerController.deleteFtpServer);

module.exports = router;
