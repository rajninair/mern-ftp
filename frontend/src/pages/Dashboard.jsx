import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo } from '../features/todos/todosSlice';
import { logout } from '../features/auth/authSlice';
import TodoList from '../components/TodoList';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { todos, status, error } = useSelector((state) => state.todos);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    dispatch(addTodo({ title, content }));
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <div>
        {JSON.stringify(status)}
        {JSON.stringify(error)}
<hr />
<br />
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
      <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <hr />
      <br />
      <button onClick={() => dispatch(logout())}>Logout</button>
      <h2>Your Todos</h2>
      <TodoList todos={todos} />


    </div>
  );
};

export default Dashboard;
