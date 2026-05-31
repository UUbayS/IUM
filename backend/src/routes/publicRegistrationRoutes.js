const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { publicLimiter } = require('../middleware/rateLimitMiddleware');
const {
  submitRegistration,
  checkStatus,
} = require('../controllers/publicRegistrationController');

router.post(
  '/registrations',
  publicLimiter,
  upload.fields([
    { name: 'kartu_keluarga', maxCount: 1 },
    { name: 'kartu_nisn', maxCount: 1 },
    { name: 'akta_kelahiran', maxCount: 1 },
    { name: 'ktp_orang_tua', maxCount: 1 },
    { name: 'transkrip_nilai', maxCount: 1 },
    { name: 'ijazah', maxCount: 1 },
    { name: 'skl_mutasi', maxCount: 1 },
    { name: 'payment_proof', maxCount: 1 },
  ]),
  submitRegistration
);

router.get('/registrations/check-status', publicLimiter, checkStatus);

module.exports = router;
