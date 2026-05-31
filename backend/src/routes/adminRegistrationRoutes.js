const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAllRegistrations,
  getRegistrationDetail,
  updateRegistrationStatus,
} = require('../controllers/adminRegistrationController');
const { verifyDocument, downloadDocument } = require('../controllers/documentController');
const { verifyPayment } = require('../controllers/paymentController');
const { exportRegistrations } = require('../controllers/exportController');

router.use(authMiddleware);

router.get('/admin/registrations', getAllRegistrations);
router.get('/admin/registrations/:id', getRegistrationDetail);
router.put('/admin/registrations/:id/status', updateRegistrationStatus);

router.put('/admin/documents/:id/verify', verifyDocument);
router.get('/admin/documents/:id/download', downloadDocument);
router.put('/admin/payments/:id/verify', verifyPayment);

router.get('/admin/export/registrations', exportRegistrations);

module.exports = router;
