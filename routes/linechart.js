const express = require("express");
const Router = express.Router();
const LineChartData = require('../model/linechartdata');

Router.get("/", async (req, res) => {
    try {
        const data = await LineChartData.find();
        res.status(200).send(data); // Send status code 200 for successful request
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error"); // Send status code 500 for internal server error
    }
});

module.exports = Router;
