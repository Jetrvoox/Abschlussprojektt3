const { Product } = require('./models');
const sequelize = require('./config/sequelize');

const seedProducts = async () => {
    await sequelize.sync({ force: true });

    const products = [
        {
            name: 'Aged Gouda',
            description: '36-month aged Dutch cheese with caramel notes',
            price: 24.99,
            category: 'Hard Cheese',
            stock: 15,
            tags: ['aged', 'dutch', 'caramel']
        },
        {
            name: 'Brie de Meaux',
            description: 'Classic French soft-ripened cheese',
            price: 32.50,
            category: 'Soft Cheese',
            stock: 10,
            tags: ['french', 'creamy', 'soft']
        },
        {
            name: 'Roquefort',
            description: 'Aged French blue cheese with sharp flavor',
            price: 41.75,
            category: 'Blue Cheese',
            stock: 8,
            tags: ['blue', 'french', 'aged']
        },
        {
            name: 'Manchego',
            description: 'Spanish sheep milk cheese with nutty flavor',
            price: 28.95,
            category: 'Hard Cheese',
            stock: 12,
            tags: ['spanish', 'sheep', 'nutty']
        }
    ];

    await Product.bulkCreate(products);
    console.log('Database seeded with products!');
    process.exit(0);
};

seedProducts().catch(console.error);