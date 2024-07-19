import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFtpServers } from '../features/ftpservers/ftpserverSlice';
import FtpServerItem from './FtpServerItem';
import AddFtpServer from './AddFtpServer';

const FtpServerList = () => {
  const dispatch = useDispatch();
  const ftpServers = useSelector((state) => state.ftpservers.ftpServers);

  useEffect(() => {
    dispatch(fetchFtpServers());
  }, [dispatch]);

  return (
    <div>

      <div className="form-wrapper">
        <h2>Add New FTP Server</h2>
      <AddFtpServer />
      </div>

      <h3>Ftp Server List</h3>
      {ftpServers.map((ftpServer) => (
        <FtpServerItem key={ftpServer.id} ftpServer={ftpServer} />
      ))}
    </div>
  );
};

export default FtpServerList;
