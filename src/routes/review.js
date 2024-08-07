const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
// Định nghĩa các route cho collection "reviews"
router.get('/', reviewController.getAllReviews);
router.post('/add-review', reviewController.createReview);
//router.get('/:reviewId', reviewController.getReviewById);
router.get('/:tourId', reviewController.getReviewsByTourId);
router.put('/:reviewId', reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
