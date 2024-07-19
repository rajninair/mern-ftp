import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFtpServer } from '../features/ftpservers/ftpserverSlice';
import EditFtpServer from './EditFtpServer';

const FtpServerItem = ({ ftpServer }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteFtpServer = async (id) => {
    if (window.confirm('Are you sure you want to delete this FTP server?')) {
      await dispatch(deleteFtpServer(id));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <EditFtpServer ftpServer={ftpServer} cancelEdit={handleCancelEdit} />
      ) : (
        <div>
          <h3>{ftpServer.id} - {ftpServer.sftpHostName}</h3>
          <p>IP: {ftpServer.sftpHostIP}</p>
          <p>Username: {ftpServer.sftpUsername}</p>
          <p>Port: {ftpServer.sftpPort}</p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => handleDeleteFtpServer(ftpServer.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default FtpServerItem;
