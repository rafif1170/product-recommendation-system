const express = require('express');
const router = express.Router();
const RecommendationController = require('../controllers/recommendationController');

// Recommendation Routes
router.get('/', RecommendationController.index);

module.exports = router;