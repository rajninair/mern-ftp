import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFtpServers } from '../features/ftpservers/ftpserverSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const ftpServers = useSelector((state) => state.ftpservers.ftpServers);


  useEffect(() => {
    dispatch(fetchFtpServers());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <TodoList />
      <h2>FTP Servers</h2>
      <FtpServerList /> */}

      <div style={{width: '150px',textAlign: 'center', border: '1px solid black'}}>
        <h3>FTP Servers</h3>
      {ftpServers.length}
      </div>
    </div>
  );
};

export default Dashboard;
