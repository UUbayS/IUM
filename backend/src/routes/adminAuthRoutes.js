const express = require('express');
const router = express.Router();
const { authLimiter } = require('../middleware/rateLimitMiddleware');
const { loginAdmin } = require('../controllers/adminAuthController');

router.post('/admin/login', authLimiter, loginAdmin);

module.exports = router;
