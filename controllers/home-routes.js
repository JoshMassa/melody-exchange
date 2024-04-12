const router = require("express").Router();
const { Post, User, Category, Product, Comment } = require('../models');
const withAuth = require('../utils/auth');
const cloudinary = require('cloudinary');


// Home Route
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page)  || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    try {
        const { count, rows: postData } = await Post.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: User
                },
                {
                    model: Product,
                    include: [Category]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        const posts = postData.map(post => post.get({ plain: true }));
        const totalPages = Math.ceil(count / limit);

        res.render('home', {
            posts,
            totalPages,
            currentPage: page,
            logged_in: req.session.logged_in,
            pagination: {
                page,
                limit,
                totalRows: count
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Single Post Route
router.get('/posts/:id', withAuth, async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            include: User
          },
          {
            model: User,
          },
        ],
      });

      const post = postData.get({ plain: true });
      res.render("post", {
        post,
        logged_in: req.session.logged_in
      });
});

// Route to users dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Post,
                limit,
                offset,
                order: [['createdAt', 'DESC']]                
            }],
        });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userData.get({ plain: true });

        const totalPostsCount = await Post.count({
            where: { user_id: req.session.user_id }
        });
        const totalPages = Math.ceil(totalPostsCount / limit);

        res.render('dashboard', {
            id: user.id,
            name: user.name,
            posts: user.posts,
            currentPage: page,
            totalPages,
            logged_in: true,
            pagination: {
                page,
                limit,
                totalRows: totalPostsCount
            }
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get associated post images from the cloud
router.get('/upload_signature', (req, res) => {
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request({
        timestamp: timestamp
    }, process.env.CLOUDINARY_API_SECRET);

    res.json({ 
        signature,
        timestamp,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME
    });
});

// Login Route
router.get('/login', async (req, res) => {
    res.render("login");
})

// Signup Route
router.get('/signup', async (req, res) => {
    res.render("signup");
})

module.exports = router;