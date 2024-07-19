import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFtpServers } from '../features/ftpservers/ftpserverSlice';
import api from '../api/axios';

const Upload = () => {
  const [selectedServer, setSelectedServer] = useState(null);
  const [ftpConnected, setFtpConnected] = useState(false);

  const dispatch = useDispatch();
  const ftpServers = useSelector((state) => state.ftpservers.ftpServers);

  useEffect(() => {
    dispatch(fetchFtpServers());
  }, [dispatch]);

  useEffect(() => {
    const savedServer = localStorage.getItem('selectedServer');
    const savedConnectionStatus = localStorage.getItem('ftpConnected') === 'true';

    if (savedServer) {
      setSelectedServer(JSON.parse(savedServer));
    }
    setFtpConnected(savedConnectionStatus);
  }, []);

  useEffect(() => {
    if (selectedServer) {
      localStorage.setItem('selectedServer', JSON.stringify(selectedServer));
    }
    localStorage.setItem('ftpConnected', JSON.stringify(ftpConnected));
  }, [selectedServer, ftpConnected]);

  const handleSelectChange = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const selected = ftpServers.find((server) => server.id === selectedId);
    setSelectedServer(selected);
  };

  const handleFTPConnection = async () => {
    if (!selectedServer) return;

    const formData = new FormData();
    formData.append('sftpHostName', selectedServer.sftpHostName);
    formData.append('sftpHostIP', selectedServer.sftpHostIP);
    formData.append('sftpUsername', selectedServer.sftpUsername);
    formData.append('sftpPassword', selectedServer.sftpPassword);
    formData.append('sftpPort', selectedServer.sftpPort);

    try {
      const response = await api.post('http://localhost:5000/connect-sftp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,  // Ensures cookies are sent with the request
      });

      if (response.status === 200) {
        setFtpConnected(true);
      } else {
        console.error('Error:', response.data.error);
        setFtpConnected(false);
      }
    } catch (error) {
      console.error('Error connecting to SFTP:', error.response ? error.response.data : error.message);
      setFtpConnected(false);
    }
  };

  const handleFTPDisconnection = async () => {
    setFtpConnected(false);
    setSelectedServer(null);
    localStorage.removeItem('selectedServer');
    localStorage.removeItem('ftpConnected');
  };


  return (
    <div>
      <h3>
        Is ftp connected?? - {ftpConnected && 
          <div style={{color: "green", fontSize: '30px', padding: "20px"}}>
            FTP Connected!
          </div>
        }
      </h3>
      {JSON.stringify(ftpConnected)}
      <hr />
   
      <h3>
        {JSON.stringify(selectedServer)}
        <br />
        <br />
        {JSON.stringify(selectedServer)}
      </h3>

      {selectedServer ? (
        <p>
          You have selected: {selectedServer.sftpHostName} (
          {selectedServer.sftpHostIP})
        </p>
      ) : (
        <p>Select a server from the dropdown</p>
      )}
      <br />

      <div className="select-wrapper">
      <select
        name="ftpSelect"
        id="ftpSelect"
        onChange={handleSelectChange}
        value={selectedServer ? selectedServer.id : ''}
      >
        <option value="" disabled>
          Select a server
        </option>
        {ftpServers.map((server) => (
          <option key={server.id} value={server.id}>
            {server.sftpHostName} ({server.sftpHostIP})
          </option>
        ))}
      </select>
      </div>

      <hr />

      {selectedServer && (
        <div>
          <button
            type="button"
            disabled={ftpConnected}
            onClick={handleFTPConnection}
            className={`p-3 text-white ${ftpConnected ? "bg-green-500" : "bg-blue-500"}`}
          >
            {ftpConnected ? "Connected" : "Connect"}
          </button>
          &nbsp; &nbsp; &nbsp;
          <button
            type="button"
            disabled={!ftpConnected}
            onClick={handleFTPDisconnection}
            className={`p-3 ${!ftpConnected ? "bg-gray-500" : "bg-blue-500"}`}
          >
            Disconnect
          </button>
          <hr />
        </div>
      )}
    </div>
  );
}

export default Upload;
