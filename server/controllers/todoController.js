const Todo = require('../models/todoModel');

/**
 * @route GET api/
 * @description get all tasks
 * @access public
 */

const getAllTasks = async (req, res) => {
  const allTasks = await Todo.find();
  res.status(200).json(allTasks);
};

/**
 * @route POST api/
 * @description create new task
 * @access public
 */

const createTask = async (req, res) => {
  const { title, section, date, time } = req.body;
  // Check if body has all needed things
  if (!title || !section || !date || !time) {
    return res.status(400).json({ error: 'All fields are required!' });
  }
  // Creating task
  const createdTask = await Todo.create({ title, section, date, time });
  res.status(201).json(createdTask);
};

/**
 * @route PUT api/:id
 * @description update task
 * @access public
 */

const updateTask = async (req, res) => {
  // Check if task exists
  const task = await Todo.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  // Updating task
  const updatedTask = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedTask);
};

/**
 * @route DELETE api/:id
 * @description delete task
 * @access public
 */

const deleteTask = async (req, res) => {
  // Check if task exists
  const task = await Todo.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  // Deleting task
  const taskToDel = await Todo.findByIdAndDelete(req.params.id);
  res.status(202).json(taskToDel);
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
