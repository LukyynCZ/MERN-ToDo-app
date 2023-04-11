const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/todoController');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;
