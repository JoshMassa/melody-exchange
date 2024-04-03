const sequelize = require('../config/connection');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const productData = require('./productData.json');

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

    process.exit(0);
};

seedDatabase();