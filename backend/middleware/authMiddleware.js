const jwt = require("jsonwebtoken");
const ToDoUser = require("../models/userModels");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // // Get user from the token
      req.user = await ToDoUser.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ error });
    }
  } else {
    res.status(401).json({ message: "Please provide a bearer token" });
  }
};

module.exports = { protect };
