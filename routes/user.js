const express = require("express");
const router = express.Router();
const User = require("../model/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// route-1 to sign or we can say that to create the user 
router.post(
  "/",
  [
    // Validation rules for name, email, and password
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
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

      var salt = bcrypt.genSaltSync(10);

      const secPass = await bcrypt.hash(req.body.password, salt);

      const requestBody = {
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      };

      // Create a new user instance
      const newUser = new User(requestBody);

      // Save the user to the database
      await newUser.save();

      // Send success response
      const authToken = jwt.sign(
        {
          id: newUser.id,
        },
        "abcdefg"
      );

      res.send(authToken);
    } catch (error) {
      // Handle errors
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);



// route-2 to login the user with auth token
router.post("/login", [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 5 }).exists().withMessage("Password must be at least 5 characters long"),
]

, async (req, res) => {
  const { email, password } = req.body; //  taking out object property from req.body with help of destructure
  try {
    let user = await User.findOne({ email }); // findone is method that provide by  mongoDB itself

    if (!user) {
      return res
        .status(400)
        .json({ error: "please try to login with correct credential" });
    } //  checking if user not exist in our database. if user not exist we simply retune

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "please try to login with correct credential" });
    } //  checking if user not exist in our database. if user not exist we simply retune

    const authToken = jwt.sign(
      {
        id: user.id,
      },
      "abcdefg"
    ); // creating auth token

    res.send(authToken); // sending auth token
  } catch (error) {
    // Handle errors
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
