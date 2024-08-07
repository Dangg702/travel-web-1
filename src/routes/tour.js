const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const tourController = require('../controllers/TourController');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.post('/upload', multipartMiddleware, tourController.uploadCK);
router.post('/add-tour', tourController.addTour);
router.put('/edit-tour/:id', tourController.editTour);
router.delete('/delete-tour/:id', tourController.deleteTour);
router.get('/create-tour', authenticateToken, tourController.createForm);
router.get('/edit-tour/:id', authenticateToken, tourController.editForm);
router.get('/get-tour/:id', authenticateToken, tourController.getTour);
router.get('/search-tours/:name', authenticateToken, tourController.searchTours);
router.get('/search-tour/:id', tourController.searchTourById);
router.get('/all-tours', authenticateToken, tourController.getAll);
router.get('/latest-tours', authenticateToken, tourController.getLatestTours);
router.get('/tours-type/:type', authenticateToken, tourController.getToursByType);
router.get('/:region', authenticateToken, tourController.getToursByRegion);

module.exports = router;
