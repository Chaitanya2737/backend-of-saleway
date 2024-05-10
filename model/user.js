const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

// Wait for MongoDB connection to be established
mongoose.connection.on('connected', () => {
  // Create indexes after connection is established
  User.createIndexes()
    .then(() => {
      console.log("Indexes created successfully");
    })
    .catch((err) => {
      console.error("Error creating indexes:", err);
    });
});

module.exports = User;
