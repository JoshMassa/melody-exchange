const router = require("express").Router();
const { Post, User, Category, Product } = require('../models');

router.get('/', async (req, res) => {
    console.log('Hello?');
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

module.exports = router;