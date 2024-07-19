const express = require('express');
const todoController = require('../controllers/todoController');
const checkAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', checkAuth, todoController.getTodos);
router.post('/', checkAuth, todoController.createTodo);
router.put('/:id', checkAuth, todoController.updateTodo);
router.delete('/:id', checkAuth, todoController.deleteTodo);

module.exports = router;
