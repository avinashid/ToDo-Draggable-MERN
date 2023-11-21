const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ToDo = require("../models/userModels");

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = async (req, res) => {
  const { name, username, password } = req.body;

  // Check if all data is given
  if (!name || !username || !password) {
    return res.status(400).json({ message: "One attribute is missing" });
  }

  // Check if user exists
  const userExists = await ToDo.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: "User already exist" });
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await ToDo.create({
    name,
    username,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Something Went WRong" });
  }
};

// @desc Authenticate User
// @route POST /api/login
// @access Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Plase fill username and password" });
  } else {
    const user = await ToDo.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200);
      res.json({
        _id: user.id,
        name: user.name,
        usrname: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  }
};

// @desc Get user data
// @route GET /api/users/me
// @access private
const getMe = async (req, res) => {
  const { _id, name, username } = await ToDo.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    username,
  });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
