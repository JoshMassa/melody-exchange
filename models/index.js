const User = require('./User');

User.hasMany(Product, {
    foreignKey: "user_id",
});

Product.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = { User };