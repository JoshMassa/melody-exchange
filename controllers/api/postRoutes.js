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
        
        const { title, content } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        
        const newPost = await Post.create({
            title,
            content,
            image: imagePath,
            user_id: req.session.user_id,
        });
        
        res.status(200).json(newPost);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json(err);
    }
});

module.exports = router;