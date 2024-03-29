const express = require("express");
const router = express.Router();

const {
  getToDo,
  addToDo,
  markToDo,
  deleteToDo,
  updateToDo,
} = require("../controllers/toDoControllers");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addToDo);
router.post("/me", protect, getToDo);
router.post("/mark", markToDo);
router.post("/delete", deleteToDo);
router.post("/updateToDo",protect, updateToDo);

module.exports = router;
