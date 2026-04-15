const mongoose = require('mongoose')

const connectDB= async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connected (Order Service) ');
        
    } catch (error) {
        console.error('Mongodb connection error', error);
        process.exit(1)
    }
}

module.exports = connectDB