const express = require('express');
const LinkController = require('../controllers/LinkController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/check', LinkController.checkLink);
router.get('/trending', LinkController.getTrendingScams);
router.get('/category/:category', LinkController.getScamsByCategory);
router.get('/statistics', LinkController.getStatistics);
router.get('/search', LinkController.searchLinks);
router.post('/report', LinkController.reportLink);
router.get('/details/:url', LinkController.getLinkDetails);

module.exports = router;
