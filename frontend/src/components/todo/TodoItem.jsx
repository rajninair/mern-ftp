import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo } from '../../features/todos/todosSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editContent, setEditContent] = useState(todo.content);

  const handleUpdateTodo = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      return;
    }
    await dispatch(updateTodo({
      id: todo.id,
      title: editTitle,
      content: editContent,
    }));
    setIsEditing(false);
  };

  const handleDeleteTodo = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await dispatch(deleteTodo(todo.id));
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button onClick={handleUpdateTodo}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{todo.title}</h3>
          <p>{todo.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDeleteTodo}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
