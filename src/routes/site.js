const express = require('express');
const router = express.Router();
const { authMiddleware, authenticateToken } = require('../middleware/authMiddleware');

const indexController = require('../controllers/IndexController');
const blogsController = require('../controllers/BlogsController');
const dashboardController = require('../controllers/DashboardController');

router.get('/blogs', authenticateToken, blogsController.getBlogs);
router.get('/blogs/create-blog',authMiddleware, authenticateToken, blogsController.blogForm);
router.post('/blogs/create-blog',authMiddleware, authenticateToken, blogsController.createBlog);
router.get('/blogs/:title', authenticateToken, blogsController.getBlog);
router.get('/dashboard', authMiddleware, authenticateToken, dashboardController.getIndex);
router.get('/contact', authenticateToken, indexController.getContact);
router.post('/contact', indexController.sendContact);
router.get('/', authenticateToken, indexController.getIndex);
module.exports = router;
