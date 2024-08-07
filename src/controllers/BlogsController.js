// const { Blogs } = require('../config/db');
const Blogs = require('../models/Blogs');
const User = require('../models/User');
const dotenvFlow = require('dotenv-flow');
dotenvFlow.config();

class BlogsController {
    // GET /blogs
    async getBlogs(req, res, next) {
        const userId = req.user ? req.user.id : null;
        let user = null;
        if (userId != null) {
            user = await User.findById(userId);
        }
        // const blogs = await Blogs.getBlogs();
        const blogs = await Blogs.find();
        if (!blogs) {
            res.status(404).json({ message: 'No blogs found' });
        } else {
            res.render('blogs', {
                cssLink: '/css/blogs.css',
                user,
                blogs,
            });
        }
    }
    // GET /blogs/:title
    async getBlog(req, res, next) {
        const title = req.params.title;
        const userId = req.user ? req.user.id : null;
        let user = null;
        if (userId != null) {
            user = await User.findById(userId);
        }
        // const blog = await Blogs.getBlogByTitle(title);
        const blog = await Blogs.findOne({ title: title });
        if (blog) {
            res.render('blog', {
                cssLink: '/css/blogs.css',
                user,
                blog,
            });
        } else {
            return res.status(404).json({ message: 'No blog found' });
        }
    }
    // GET /blogs/create-blog
    async blogForm(req, res, next) {
        const userId = req.user ? req.user.id : null;
        let user = null;
        if (userId != null) {
            user = await User.findById(userId);
        }

        res.render('create-blog', {
            layout: 'layouts/dashboard-layout',
            cssLink: '/css/error.css',
            user,
        });
    }
    // POST /blogs/create-blog
    async createBlog(req, res, next) {
        const { title, imgUrl, desc, contentHtml } = req.body;
        const blog = new Blogs({
            title,
            imgUrl,
            desc,
            contentHtml,
        });
        blog.save()
            .then(() => {
                res.status(201).json({ message: 'Blog created successfully' });
            })
            .catch((err) => {
                res.status(500).json({ message: 'Internal server error' });
            });
        // const blogData = req.body;
        // const blog = await Blogs.createBlog(blogData);

        // if (typeof blog === 'number') {
        //     const successMessage = 'Blog created successfully';
        //     res.write('<script>alert("' + successMessage + '"); window.location.href="/blogs/create-blog";</script>');
        //     console.log(successMessage);
        // }
    }
    // PATCH /blogs/update/:id
    async updateBlog(req, res, next) {
        try {
            const blogId = req.params.id;
            const updateData = req.body;
            const updatedBlog = await Blogs.findByIdAndUpdate(blogId, updateData);
            if (!updatedBlog) {
                return res.status(404).json({ message: 'No blog found', status: 'fail' });
            }
            res.status(200).json({ message: 'Blog updated successfully', status: 'ok' });
        } catch (err) {
            next(err);
        }
    }
    // DELETE /blogs/delete/:id
    async deleteBlog(req, res, next) {
        try {
            const blogId = req.params.id;
            const deletedBlog = await Blogs.findByIdAndDelete(blogId);
            if (!deletedBlog) {
                return res.status(404).json({ message: 'No blog found' });
            }
            res.status(200).json({ message: 'Blog deleted successfully', status: 'ok' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new BlogsController();
