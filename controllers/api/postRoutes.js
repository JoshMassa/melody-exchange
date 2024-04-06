const router = require('express').Router();
const { Category, Post, Product, User} = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;