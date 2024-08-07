const express = require('express');
const router = express.Router();
const { authMiddleware, authUserMiddleware, authenticateToken } = require('../middleware/authMiddleware');

const userController = require('../controllers/UserController');

router.get('/edit-form/:id', authMiddleware, userController.editForm);
router.patch('/update-user/:id', authUserMiddleware, userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/get-user/:name', userController.getUser);
router.get('/get-all', authMiddleware, userController.getAllUsers);
router.post('/refresh-token', userController.refreshToken);
router.get('/manage', authMiddleware, authenticateToken, userController.userPage);
module.exports = router;
