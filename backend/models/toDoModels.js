const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
    },
    title: {
      type: String,
    },
    toDo: {
      type: String,
      required: [true, "Please add post Description"],
    },
    markToDo: {
      type: Boolean,
    },
    position: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ToDo", todoSchema);
