const ToDoUser = require("../models/userModels");

const getToDo = async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json("username not found");
  try {
    const todo = await ToDoUser.findOne({ username });
    res.status(200).json(todo.toDo);
  } catch (error) {
    res.status(501).json({ Error: error.message });
  }
};

const updateToDo = async (req, res) => {
  const { username, toDo } = req.body;
  if (!username) return res.status(400).json("username not found");
  try {
    const todo = await ToDoUser.findOne({
      username,
    });
    todo.toDo = toDo;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(501).json({ Error: error.message });
  }
};

const addToDo = async (req, res) => {
  try {
    const { username, title, toDo, markToDo } = req.body;
    if (!username || !toDo)
      return res.status(400).json({ message: "not enough data" });
    const toDoData = await ToDoUser.findOne({ username });
    toDoData.toDo.push({
      username,
      title,
      toDo,
      markToDo: false,
    });
    await toDoData.save();
    res.status(200).json(toDoData.toDo);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

const markToDo = async (req, res) => {
  const toDoId = req.body;
  if (!toDoId) return res.status(400).json("mess", "toDoId not found");
  const updateMark = await ToDoUser.findOne({
    toDo: { _id: toDoId },
  });
  const mark = updateMark.markToDo;
  updateMark.markToDo = !mark;
  await updateMark.save();
  res.status(200).json(updateMark);
};

const deleteToDo = async (req, res) => {
  const toDoId = req.body;
  if (!toDoId) return res.status(400).json("mess", "toDoId not found");
  const deleted = await ToDo.deleteOne({
    _id: toDoId,
  });

  if (deleted.deletedCount !== 1)
    return res.status(400).json({ Message: "toDo not Found" });
  const updateUserToDo = await ToDoUser.findOne({
    username,
  });
  updateUserToDo.posts.pull(toDoId);
  await updateUserToDO.save();
  res.status(200).json(updateUserToDo);
  try {
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getToDo,
  addToDo,
  markToDo,
  deleteToDo,
  updateToDo,
};
