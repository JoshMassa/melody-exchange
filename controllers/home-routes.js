const router = require("express").Router();
const { Post, User, Category, Product, Comment } = require('../models');
const withAuth = require('../utils/auth');


// Home Route
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User
                },
                {
                    model: Product,
                    include: [
                        {
                            model: Category
                        }
                    ]
                }
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);

        res.render('home', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Single Post Route
router.get('/posts/:id', withAuth, async (req, res) => {
    console.log('req.params.id:', req.params.id);
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
      console.log('post', post);
      res.render("post", {
        post,
        logged_in: req.session.logged_in
      });
});

// Route to users dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });
        res.render('dashboard', {
            id: user.id,
            name: user.name,
            posts: user.posts,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
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