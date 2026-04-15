const mongoose = require('mongoose');
const path = require('path');
const Product = require('../models/Product');
const products = require('./products.json');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const seedProducts = async () => {
    try {

        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI is undefined. Check your .env file location and format.");
        }

        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB Connected to Atlas');

        await Product.deleteMany({});
        console.log('🗑️  Existing products cleared');

        await Product.insertMany(products);
        console.log('🌱 Products seeded successfully to Atlas!');

        process.exit();
    } catch (err) {
        console.error('❌ Seeding Error:', err);
        process.exit(1);
    }
};

seedProducts();