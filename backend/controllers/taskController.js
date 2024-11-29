const Task = require("../models/task");

exports.createTask = async (req, res) => {
  try {
    const { name, description, assignedTo } = req.body;
    const task = await new Task({
      name,
      description,
      assignedTo,
      createdBy: req.managerId,
    }).save();
    res.status(201).json({ message: "Task created", taskId: task._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.managerId }).populate(
      "assignedTo"
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
