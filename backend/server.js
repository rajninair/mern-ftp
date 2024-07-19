const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
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

// Middleware to check authentication
const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, 'secret');
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Authentication routes
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

console.log("token: " + token);

// Set cookie with options
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
  sameSite: 'Lax',
}).json({ message: "Logged in" });

});

// Verify token
app.get('/verify-token', checkAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  res.json(user);
});


// Add this route to handle logout
app.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
});



// CRUD routes for todos

app.get('/todos', checkAuth, async (req, res) => {
  const todos = await prisma.todo.findMany({ where: { userId: req.userId } });
  res.json(todos);
});

app.post('/todos', checkAuth, async (req, res) => {
  const { title, content } = req.body;
  const todo = await prisma.todo.create({
    data: { title, content, userId: req.userId }
  });
  res.json(todo);
});

app.put('/todos/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  console.log("update todo api ... ")
  console.log("title ... ", title)
  console.log("content ... ", content)
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { title, content }
  });
  res.json(todo);
});

app.delete('/todos/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({ where: { id: Number(id) } });
  res.json({ message: "Todo deleted" });
});



// CRUD routes for FTP servers

// Fetch all FTP servers
app.get('/ftpservers', checkAuth, async (req, res) => {
  try {
    const ftpServers = await prisma.ftpServers.findMany();
    res.json(ftpServers);
  } catch (error) {
    console.log("Error fetching server", error)

    res.status(500).json({ error: 'Failed to fetch FTP servers' });
  }
});

// Create a new FTP server
app.post('/ftpservers', checkAuth, async (req, res) => {
  const { sftpHostName, sftpHostIP, sftpUsername, sftpPassword, sftpPort } = req.body;

  try {
    const ftpServer = await prisma.ftpServers.create({
      data: {
        sftpHostName,
        sftpHostIP,
        sftpUsername,
        sftpPassword,
        sftpPort,
        createdBy: req.userId,  // use the user ID from the authenticated user
      },
    });

    res.json(ftpServer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the FTP server' });
  }
});


// Update an FTP server
app.put('/ftpservers/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  const { sftpHostName, sftpHostIP, sftpUsername, sftpPassword, sftpPort } = req.body;

  try {
    const ftpServer = await prisma.ftpServers.update({
      where: { id: Number(id) },
      data: {
        sftpHostName,
        sftpHostIP,
        sftpUsername,
        sftpPassword,
        sftpPort,
      },
    });

    res.json(ftpServer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the FTP server' });
  }
});


// Delete an FTP server
app.delete('/ftpservers/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.ftpServers.delete({ where: { id: Number(id) } });
    res.json({ message: "FTP server deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the FTP server' });
  }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
