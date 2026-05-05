const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create sample user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const user = await User.create({
      name: 'John Seller',
      email: 'seller@example.com',
      password: hashedPassword,
    });

    // Create sample products
    const products = [
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 99.99,
        category: 'Electronics',
        stock: 50,
        image: 'https://via.placeholder.com/300x300?text=Wireless+Headphones',
        seller: user._id,
      },
      {
        name: 'Laptop Stand',
        description: 'Adjustable laptop stand for better ergonomics',
        price: 29.99,
        category: 'Electronics',
        stock: 100,
        image: 'https://via.placeholder.com/300x300?text=Laptop+Stand',
        seller: user._id,
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt',
        price: 19.99,
        category: 'Clothing',
        stock: 200,
        image: 'https://via.placeholder.com/300x300?text=Cotton+Tshirt',
        seller: user._id,
      },
      {
        name: 'JavaScript Book',
        description: 'Learn JavaScript from basics to advanced',
        price: 39.99,
        category: 'Books',
        stock: 75,
        image: 'https://via.placeholder.com/300x300?text=JavaScript+Book',
        seller: user._id,
      },
      {
        name: 'Coffee Mug',
        description: 'Ceramic coffee mug, dishwasher safe',
        price: 12.99,
        category: 'Home',
        stock: 150,
        image: 'https://via.placeholder.com/300x300?text=Coffee+Mug',
        seller: user._id,
      },
      {
        name: 'Phone Charger',
        description: 'Fast charging USB-C phone charger',
        price: 24.99,
        category: 'Electronics',
        stock: 120,
        image: 'https://via.placeholder.com/300x300?text=Phone+Charger',
        seller: user._id,
      },
    ];

    await Product.insertMany(products);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
