const User = require('./User');
const Post = require('./Post');
const Product = require('./Product');
const Category = require('./Category');
const Comment = require('./Comment');

User.hasMany(Product, {
    foreignKey: "user_id",
});

User.hasMany(Post, {
    foreignKey: "user_id",
});

Post.belongsTo(User, {
    foreignKey: "user_id",
});

Post.hasOne(Product, {
    foreignKey: "product_id",
});

Post.hasOne(Category, {
    foreignKey: "category_id",
});

Category.belongsTo(Post, {
    foreignKey: "category_id",
});

Category.hasMany(Product, {
    foreignKey: "category_id",
});

Category.hasMany(Post, {
    foreignKey: "category_id",
})

Product.belongsTo(User, {
    foreignKey: "user_id",
});

Product.belongsTo(Category, {
    foreignKey: "category_id",
});

Product.belongsTo(Post, {
    foreignKey: "product_id"
});

Post.hasMany(Comment, {
    foreignKey: "post_id"
});

Comment.belongsTo(Post, {
    foreignKey: "post_id"
});

User.hasMany(Comment, {
    foreignKey: "user_id"
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = { User, Post, Product, Category, Comment };