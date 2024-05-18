const express = require("express");
const router = express.Router();
const ChatData = require("../model/chatdata");

router.get("/", async (req, res) => {
    try {
        const data = await ChatData.find();
        res.status(200).send(data); // Send status code 200 for successful request
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send("Internal Server Error"); // Send status code 500 for internal server error
    }
});

module.exports = router;
