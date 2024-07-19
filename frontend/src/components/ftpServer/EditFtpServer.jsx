import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFtpServer } from '../../features/ftpservers/ftpserverSlice';

const EditFtpServer = ({ ftpServer, cancelEdit }) => {
  const dispatch = useDispatch();
  const [ftpServerData, setFtpServerData] = useState({
    sftpHostName: ftpServer.sftpHostName,
    sftpHostIP: ftpServer.sftpHostIP,
    sftpUsername: ftpServer.sftpUsername,
    sftpPassword: ftpServer.sftpPassword,
    sftpPort: ftpServer.sftpPort,
  });

  const handleUpdateFtpServer = async () => {
    if (!ftpServerData.sftpHostName.trim() || !ftpServerData.sftpHostIP.trim() || !ftpServerData.sftpUsername.trim() || !ftpServerData.sftpPassword.trim() || !ftpServerData.sftpPort) {
      return;
    }
    await dispatch(updateFtpServer({ id: ftpServer.id, ...ftpServerData }));
    cancelEdit();
  };

  return (
    <div>
      <input
        type="text"
        value={ftpServerData.sftpHostName}
        onChange={(e) => setFtpServerData({ ...ftpServerData, sftpHostName: e.target.value })}
      />
      <input
        type="text"
        value={ftpServerData.sftpHostIP}
        onChange={(e) => setFtpServerData({ ...ftpServerData, sftpHostIP: e.target.value })}
      />
      <input
        type="text"
        value={ftpServerData.sftpUsername}
        onChange={(e) => setFtpServerData({ ...ftpServerData, sftpUsername: e.target.value })}
      />
    
    <input
        type="password"
        value={ftpServerData.sftpPassword}
        onChange={(e) => setFtpServerData({ ...ftpServerData, sftpPassword: e.target.value })}
      />
      <input
        type="number"
        value={ftpServerData.sftpPort}
        onChange={(e) => setFtpServerData({ ...ftpServerData, sftpPort: Number(e.target.value) })}
      />
      <button onClick={handleUpdateFtpServer}>Save</button>
      <button onClick={cancelEdit}>Cancel</button>
    </div>
  );
};

export default EditFtpServer;


       
