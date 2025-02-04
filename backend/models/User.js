const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        email: { type: DataTypes.STRING, unique: true },
        password: DataTypes.STRING,
        role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' }
    });

    User.beforeCreate(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
    });

    return User;
};