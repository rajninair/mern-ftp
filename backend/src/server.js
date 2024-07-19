const SFTPClient = require('ssh2-sftp-client');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const ftpServerRoutes = require('./routes/ftpServerRoutes');
const checkAuth = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend origin
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use('/ftpservers', ftpServerRoutes);


// SFTP Connection
// SFTP Connection Endpoint
app.post('/connect-sftp', checkAuth, async (req, res) => {
  const { sftpHostName, sftpHostIP, sftpUsername, sftpPassword, sftpPort } = req.body;

  const sftp = new SFTPClient();
  
  try {
    // await sftp.connect({
    //   host: sftpHostIP,
    //   port: sftpPort,
    //   username: sftpUsername,
    //   password: sftpPassword,
    // });
    await sftp.connect({
      host: '170.187.248.153',
      port: 22,
      username: 'root',
      password: 'liGodblessall19762021',
    });
    res.json({ message: 'Connected to SFTP server successfully' });
  } catch (error) {
    console.error('Error connecting to SFTP server:', error);
    res.status(500).json({ error: 'Failed to connect to SFTP server' });
  } finally {
    sftp.end();
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
