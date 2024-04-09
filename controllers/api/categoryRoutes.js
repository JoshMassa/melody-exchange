const router = require("express").Router();
const { Post, User, Category, Product } = require('../../models');

router.get('/guitars', async (req, res) => {
    try {
        const guitarsCategory = await Category.findOne({ 
            where: { id: 1 } });

        if (!guitarsCategory) {
            return res.status(404).json({ error: "Category not found." });
        }

        const guitarsPosts = await Post.findAll({
            include: [
                {
                    model: Product,
                    include: [Category]
                },
                User
            ],
            where: { category_id: guitarsCategory.id }
        });

        const posts = guitarsPosts.map(post => post.get({ plain: true }));
        res.render('categories', {
            guitarsCategory: guitarsCategory.get({ plain: true }),
            guitarsPosts: posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/bassguitars', async (req, res) => {
    try {
        const bassGuitarsCategory = await Category.findOne({ 
            where: { id: 2 } });

        if (!bassGuitarsCategory) {
            return res.status(404).json({ error: "Category not found." });
        }

        const bassGuitarsPosts = await Post.findAll({
            include: [
                {
                    model: Product,
                    include: [Category]
                },
                User
            ],
            where: { category_id: bassGuitarsCategory.id }
        });

        const posts = bassGuitarsPosts.map(post => post.get({ plain: true }));
        res.render('categories', {
            bassGuitarsCategory: bassGuitarsCategory.get({ plain: true }),
            bassGuitarsPosts: posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/drums', async (req, res) => {
    try {
        const drumsCategory = await Category.findOne({ 
            where: { id: 3 } });

        if (!drumsCategory) {
            return res.status(404).json({ error: "Category not found." });
        }

        const drumsPosts = await Post.findAll({
            include: [
                {
                    model: Product,
                    include: [Category]
                },
                User
            ],
            where: { category_id: drumsCategory.id }
        });

        const posts = drumsPosts.map(post => post.get({ plain: true }));
        res.render('categories', {
            drumsCategory: drumsCategory.get({ plain: true }),
            drumsPosts: posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/keyboards', async (req, res) => {
    try {
        const keyboardsCategory = await Category.findOne({ 
            where: { id: 4 } });

        if (!keyboardsCategory) {
            return res.status(404).json({ error: "Category not found." });
        }

        const keyboardsPosts = await Post.findAll({
            include: [
                {
                    model: Product,
                    include: [Category]
                },
                User
            ],
            where: { category_id: keyboardsCategory.id }
        });

        const posts = keyboardsPosts.map(post => post.get({ plain: true }));
        res.render('categories', {
            keyboardsCategory: keyboardsCategory.get({ plain: true }),
            keyboardsPosts: posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/ampsandeffects', async (req, res) => {
    try {
        const ampsAndEffectsCategory = await Category.findOne({ 
            where: { id: 5 } });

        if (!ampsAndEffectsCategory) {
            return res.status(404).json({ error: "Category not found." });
        }

        const ampsAndEffectsPosts = await Post.findAll({
            include: [
                {
                    model: Product,
                    include: [Category]
                },
                User
            ],
            where: { category_id: ampsAndEffectsCategory.id }
        });

        const posts = ampsAndEffectsPosts.map(post => post.get({ plain: true }));
        res.render('categories', {
            ampsAndEffectsCategory: ampsAndEffectsCategory.get({ plain: true }),
            ampsAndEffectsPosts: posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;