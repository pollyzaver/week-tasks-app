const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

// GET все задачи
router.get('/', tasksController.getAllTasks);

// GET задачи по дню недели
router.get('/:day', tasksController.getTasksByDay);

// POST новая задача
router.post('/', tasksController.addTask);

// PUT обновление задачи по ID
router.put('/:id', tasksController.updateTask);

// DELETE удаление задачи по ID
router.delete('/:id', tasksController.deleteTask);

module.exports = router;