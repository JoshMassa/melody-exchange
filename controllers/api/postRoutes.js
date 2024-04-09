const router = require('express').Router();
const { Category, Post, Product, User} = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer');
const path = require('path');
const express = require('express');
const uploadsFolderPath = 'uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Create a new blog post
router.post('/', withAuth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'File upload failed' });
        }
        
        console.log("Request file:", req.file);
        const { title, content } = req.body;
        const imagePath = req.file ? path.join(uploadsFolderPath, req.file.filename) : null;
        
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

// Defining a route to serve uploaded images
router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

module.exports = router;