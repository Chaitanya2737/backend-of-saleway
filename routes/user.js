const express = require("express");
const router = express.Router();
const User = require("../model/user");
const { body, validationResult } = require('express-validator');

router.post("/", [
    // Validation rules for name, email, and password
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
    body('email').isEmail().withMessage("Invalid email address"),
    body('password').isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Create a new user instance
        const newUser = new User(req.body);

        // Save the user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({ msg: "User added successfully", user: newUser });
    } catch (error) {
        // Handle errors
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
