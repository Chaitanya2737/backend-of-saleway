const express = require("express");
const Router = express.Router();
const Product = require("../model/Product");

Router.get("/", async (req, res) => {
    try {
        const data = await Product.find(); // Execute the query and wait for the result
        res.send(data); // Send the fetched data as the response
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error"); // Handle errors
    }
});

module.exports = Router;
