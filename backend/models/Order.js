const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Order', {
        status: { type: DataTypes.ENUM('pending', 'completed'), defaultValue: 'pending' },
        total: DataTypes.FLOAT
    });
};