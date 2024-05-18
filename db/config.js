const mongoose = require("mongoose");

const dbURI = "mongodb+srv://chaitanyasatarkar123:Chaitanya@cluster0.c6dlbcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectToDatabase() {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 100000, // 30 seconds
            socketTimeoutMS: 450000, // 45 seconds
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        // Optionally, you can add more specific error handling or retries here
    }
}

connectToDatabase();

module.exports = mongoose.connection;
