const router = require("express").Router();
const { Post, User, Category, Product } = require('../models');

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
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Single Post Route
router.get('/posts/:id', async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Product,
          },
          {
            model: User,
          },
        ],
      });

      const post = postData.get({ plain: true });
      res.render("post", {
        post
      });
});

// Login Route
router.get('/login', async (req, res) => {
    res.render("login");
})

// Login Route
router.get('/signup', async (req, res) => {
    res.render("signup");
})


module.exports = router;