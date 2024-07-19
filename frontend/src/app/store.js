import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import todosReducer from '../features/todos/todosSlice';
import ftpserversReducer from '../features/ftpservers/ftpserverSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    ftpservers: ftpserversReducer,
  },
});

export default store;
