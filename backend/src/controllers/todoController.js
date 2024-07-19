const prisma = require('../prisma');

const getTodos = async (req, res) => {
  const todos = await prisma.todo.findMany({ where: { userId: req.userId } });
  res.json(todos);
};

const createTodo = async (req, res) => {
  const { title, content } = req.body;
  const todo = await prisma.todo.create({
    data: { title, content, userId: req.userId }
  });
  res.json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { title, content }
  });
  res.json(todo);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({ where: { id: Number(id) } });
  res.json({ message: "Todo deleted" });
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
