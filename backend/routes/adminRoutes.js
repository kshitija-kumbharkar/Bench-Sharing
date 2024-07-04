
const express = require('express');
const { addBenchType, getAllBenchTypes, updateBenchType, deleteBenchType } = require('../controllers/adminController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/benches', authenticateToken, addBenchType);
router.get('/benches', authenticateToken, getAllBenchTypes);
router.put('/benches', authenticateToken, updateBenchType);
router.delete('/benches/:id', authenticateToken, deleteBenchType);

module.exports = router;
