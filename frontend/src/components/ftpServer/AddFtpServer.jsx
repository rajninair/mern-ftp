import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFtpServer } from '../../features/ftpservers/ftpserverSlice';

const AddFtpServer = () => {
  const dispatch = useDispatch();
  const [ftpServerData, setFtpServerData] = useState({
    sftpHostName: 'do',
    sftpHostIP: '123.456',
    sftpUsername: 'root',
    sftpPassword: 'pass',
    sftpPort: 202,
  });

  const handleAddFtpServer = async () => {
    if (!ftpServerData.sftpHostName.trim() || !ftpServerData.sftpHostIP.trim() || !ftpServerData.sftpUsername.trim() || !ftpServerData.sftpPassword.trim() || !ftpServerData.sftpPort) {
      return;
    }
    await dispatch(addFtpServer(ftpServerData));
    setFtpServerData({
      sftpHostName: '',
      sftpHostIP: '',
      sftpUsername: '',
      sftpPassword: '',
      sftpPort: '',
    });
  };

  return (
    <div>

      <div>

        {JSON.stringify(ftpServerData)}
        <br />
        <br />
      </div>
      <input
        type="text"
        placeholder="Host Name"
        value={ftpServerData.sftpHostName}
        onChange={(e) => setFtpServerData({ ...ftpServerData, sftpHostName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Host IP"
        value={ftpServerData.sftpHostIP}
        onChange={(e) => setFtpServerData({ ...ftpServerData, sftpHostIP: e.target.value })}
      />
      <input
        type="text"
        placeholder="Username"
        value={ftpServerData.sftpUsername}
        onChange={(e) => setFtpServerData({ ...ftpServerData, sftpUsername: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={ftpServerData.sftpPassword}
        onChange={(e) => setFtpServerData({ ...ftpServerData, sftpPassword: e.target.value })}
      />
      <input
        type="number"
        placeholder="Port"
        value={ftpServerData.sftpPort}
        onChange={(e) => setFtpServerData({ ...ftpServerData, sftpPort: Number(e.target.value) })}
      />
      <button onClick={handleAddFtpServer}>Add FTP Server</button>
    </div>
  );
};

export default AddFtpServer;
