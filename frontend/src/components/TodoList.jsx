import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, updateTodo, deleteTodo } from '../features/todos/todosSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [editTodo, setEditTodo] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleUpdateTodo = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) {
      return;
    }
    await dispatch(updateTodo({
      id,
      title: editTitle,
      content: editContent,
    }));
    setEditTodo(null);
    setEditTitle('');
    setEditContent('');
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await dispatch(deleteTodo(id));
    }
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo.id);
    setEditTitle(todo.title); // Initialize editTitle with current todo title
    setEditContent(todo.content); // Initialize editContent with current todo content
  };

  const handleCancelEdit = () => {
    setEditTodo(null);
    setEditTitle('');
    setEditContent('');
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {editTodo === todo.id ? (
            <div style={{background: "lightgreen", width: "300px", display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {todo.id} - 
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={() => handleUpdateTodo(todo.id)}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3> {todo.id} -  {todo.title}</h3>
              <p>{todo.content}</p>
              <button onClick={() => handleEditClick(todo)}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
