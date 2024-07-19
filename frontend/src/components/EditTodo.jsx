import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../features/todos/todosSlice';

const EditTodo = ({ todo, cancelEdit }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);

  const handleUpdateTodo = async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }
    await dispatch(updateTodo({ id: todo.id, title, content }));
    cancelEdit();
  };

  return (
    <div style={{background: "lightgreen", width: "300px", display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleUpdateTodo}>Save</button>
      <button onClick={cancelEdit}>Cancel</button>
    </div>
  );
};

export default EditTodo;
