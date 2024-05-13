const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    console.log("Token:", token); // Debugging statement
    if (!token) {
      return res.status(401).send("Please authenticate using a valid token");
    }
    try {
      const data = jwt.verify(token, "abcdefg");
      console.log("JWT Payload:", data); // Debugging statement
      req.user = data;
      next();
    } catch (error) {
      console.error("JWT verification error:", error);
      return res.status(401).send("Please authenticate using a valid token");
    }
  };
  

module.exports = fetchuser;
