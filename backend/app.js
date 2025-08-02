require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const mainRouter = require('./routes/index');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

function getLocalIP() {
  const networkInterfaces = os.networkInterfaces();
  let localIP = '';

  for (const interfaceName in networkInterfaces) {
    networkInterfaces[interfaceName].forEach((interfaceDetails) => {
      if (interfaceDetails.family === 'IPv4' && !interfaceDetails.internal) {
        localIP = interfaceDetails.address;
      }
    });
  }
  return localIP;
}

connectDB();

const localIP = getLocalIP();
const allowedOrigins = [
  'http://localhost:5173',
  `http://${localIP}:5173`,
  'https://intra-cloud-v2.onrender.com' 
]

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
