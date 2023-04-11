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

module.exports = { getAllTasks, createTask };
