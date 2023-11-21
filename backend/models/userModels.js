const mongoose = require("mongoose");
const todoSchema = require("./toDoModels");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
    },
    name: {
      type: String,
      required: [true, "Please add name"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    toDo: [todoSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ToDoUser", userSchema);
