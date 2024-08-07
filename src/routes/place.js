const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const placeController = require('../controllers/PlaceController');

router.get('/add-place', authenticateToken, placeController.createForm);
router.post('/add-place', placeController.addPlace);
router.get('/edit-place/:id', authenticateToken, placeController.editForm);
router.put('/edit-place/:id', placeController.editPlace);
router.get('/search-place/:name', placeController.searchPlace);
router.get('/place-data', authenticateToken, placeController.placeTable);

module.exports = router;
