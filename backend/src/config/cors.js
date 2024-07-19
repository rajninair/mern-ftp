const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173', // Frontend origin
  credentials: true, // Allow credentials
};

module.exports = corsOptions;
