const router = require('express').Router();
const { Category, Post, Product, User} = require('../../models');
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


module.exports = router;