
const express = require('express');
const { getAvailableResources, getResourcesByType, bookResource, releaseResource, getUserBookings } = require('../controllers/companyController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/resources', authenticateToken, getAvailableResources);
router.get('/resources/:typeId', authenticateToken, getResourcesByType);
router.post('/resources/:resourceId/book', authenticateToken, bookResource);
router.post('/resources/:resourceId/release', authenticateToken, releaseResource);
router.get('/bookings', authenticateToken, getUserBookings);

module.exports = router;
