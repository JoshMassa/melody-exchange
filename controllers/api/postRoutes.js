const router = require('express').Router();
const { Category, Post, Product, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer');

const upload = multer({ dest: "./public/uploads/" });

// Create a new blog post
router.post('/', withAuth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'File upload failed' });
        }
        
        const { title, price, content, category } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        
        const newPost = await Post.create({
            title,
            price,
            content,
            image: imagePath,
            user_id: req.session.user_id,
            category_id: category
        });
        
        res.status(200).json(newPost);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.destroy({ where: { id: postId } });
        if (deletedPost === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(204).send();
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json(err);
    }
});

router.get('/:id/comments', async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.findAll({
             where: { post_id: postId },
            include: { model: User } 
        });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:id/comments', withAuth, async (req, res) => {
    try {
        // Check that the requested post exists
        const { content } = req.body;
        const requestedPost = await Post.findByPk(req.params.id);
        if (!requestedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Add the comment to the assiociated post
        const newComment = await Comment.create({
            content,
            user_id: req.session.user_id,
            post_id: req.params.id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;