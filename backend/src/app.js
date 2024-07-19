const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const ftpServerRoutes = require('./routes/ftpServerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Use routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use('/ftpservers', ftpServerRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
