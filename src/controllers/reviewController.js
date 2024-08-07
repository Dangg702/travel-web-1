const mongoose = require('mongoose');
const Review = require('../models/Review');
const User = require('../models/User');
const Tour = require('../models/Tour');

// Controller cho các hoạt động trên collection "reviews"
const reviewController = {
    getAllReviews: async (req, res) => {
        try {
            const reviews = await Review.find().sort({ createdAt: -1 });
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createReview: async (req, res) => {
        const review = new Review({
            userId: req.body.userId,
            tourId: req.body.tourId,
            rating: req.body.rating,
            comment: req.body.comment,
        });
        try {
            const newReview = await review.save();
            res.status(201).json(newReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getReviewById: async (req, res) => {
        try {
            const review = await Review.findById(req.params.reviewId);
            if (review == null) {
                return res.status(404).json({ message: 'Review not found' });
            }
            res.json(review);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getReviewsByTourId: async (tourId) => {
        try {
            const reviews = await Review.find({ tourId }).populate('userId').populate('tourId');
            const limitReviews = await Review.find({ tourId })
                .populate('userId')
                .populate('tourId')
                .sort({ createdAt: -1 })
                .limit(2);
            // console.log('review', reviews);

            if (!reviews || reviews.length === 0) {
                return [];
            }
            return { reviews, limitReviews };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateReview: async (req, res) => {
        try {
            const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, req.body, { new: true });
            if (updatedReview == null) {
                return res.status(404).json({ message: 'Review not found' });
            }
            res.json(updatedReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteReview: async (req, res) => {
        try {
            await Review.findByIdAndDelete(req.params.reviewId);
            res.json({ message: 'Review deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = reviewController;
