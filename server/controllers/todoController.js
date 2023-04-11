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
  if (!title || !section || !date || !time) {
    return res.status(400).json({ error: 'All fields are required!' });
  }
  const createdTask = await Todo.create({ title, section, date, time });
  res.status(201).json(createdTask);
};

/**
 * @route PUT api/:id
 * @description update task
 * @access public
 */

const updateTask = async (req, res) => {
  const task = await Todo.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const updatedTask = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedTask);
};

const deleteTask = async (req, res) => {};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
