const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Product', {
        name: { type: DataTypes.STRING, allowNull: false },
        description: DataTypes.TEXT,
        price: { type: DataTypes.FLOAT, allowNull: false },
        category: DataTypes.STRING,
        stock: { type: DataTypes.INTEGER, defaultValue: 0 },
        tags: DataTypes.JSON
    });
};