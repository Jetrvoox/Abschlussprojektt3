// backend/models/index.js
const sequelize = require('../config/sequelize');
const User = require('./User')(sequelize);
const Product = require('./Product')(sequelize);
const Order = require('./Order')(sequelize);

// Define relationships
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: 'OrderProducts' });
Product.belongsToMany(Order, { through: 'OrderProducts' });

module.exports = {
    User,
    Product,
    Order
};