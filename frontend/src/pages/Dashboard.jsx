import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFtpServers } from '../features/ftpservers/ftpserverSlice';
import { fetchTodos } from '../features/todos/todosSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const ftpServers = useSelector((state) => state.ftpservers.ftpServers);
  const todos = useSelector((state) => state.todos.todos);


  useEffect(() => {
    dispatch(fetchFtpServers());
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>

<div className='cards' style={{display:'flex', flexWrap: 'wrap', gap: '20px'}}>
      <div style={{width: '150px',textAlign: 'center', border: '1px solid black'}}>
        <h3>FTP Servers</h3>
      {ftpServers.length}
      </div>
  

      <div style={{width: '150px',textAlign: 'center', border: '1px solid black'}}>
        <h3>Tasks</h3>
      {todos.length}
      </div>


</div>


    </div>
  );
};

export default Dashboard;
