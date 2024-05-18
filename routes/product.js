const express = require("express");
const Router = express.Router();
const Product = require("../model/Product");

// GET /api/products - Fetch all products
Router.get("/", async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
        res.status(200).json(products); // Respond with the fetched data in JSON format
    } catch (error) {
        console.error("Error fetching products:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error", error: error.message }); // Respond with a detailed error message
    }
});

module.exports = Router;
