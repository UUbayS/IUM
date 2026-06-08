const express = require('express');
const router = express.Router();
const { authLimiter } = require('../middleware/rateLimitMiddleware');
const { loginAdmin, logoutAdmin, changePassword } = require('../controllers/adminAuthController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/admin/login', authLimiter, loginAdmin);
router.post('/admin/logout', authMiddleware, logoutAdmin);
router.put('/admin/change-password', authMiddleware, changePassword);

module.exports = router;
