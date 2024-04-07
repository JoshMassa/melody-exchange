const router = require('express').Router();
const categoryRoutes = require('./categoryRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);


module.exports = router;
