const sequelize = require('../config/connection');
const { User, Category, Product, Post } = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const productData = require('./productData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    await Category.bulkCreate(categoryData, {
        returning: true
    });

    await Product.bulkCreate(productData, {
        returning: true
    });
    
    await Post.bulkCreate(postData, {
        returning: true
    });

    process.exit(0);
};

seedDatabase();