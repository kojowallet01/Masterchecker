const express = require('express');
const ReportController = require('../controllers/ReportController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Admin routes
router.get(
  '/pending',
  authMiddleware,
  adminMiddleware,
  ReportController.getPendingReports
);
router.post(
  '/approve/:reportId',
  authMiddleware,
  adminMiddleware,
  ReportController.approveReport
);
router.post(
  '/reject/:reportId',
  authMiddleware,
  adminMiddleware,
  ReportController.rejectReport
);
router.get(
  '/stats',
  authMiddleware,
  adminMiddleware,
  ReportController.getReportStats
);

module.exports = router;
