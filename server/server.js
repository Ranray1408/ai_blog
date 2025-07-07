require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const socket = require('./socket');

app.use(cors());
app.use(express.json());

// Get and Post API for adding new custumers
const customersRoutes = require('./routes/customers.routes');
app.use('/api/customers', customersRoutes);

// Satic data, content from pages
const staticDataRoutes = require('./routes/staticData.routes');
app.use('/api', staticDataRoutes);

// === HTTP + Socket.io ===
const server = http.createServer(app);

socket(server);

server.listen(process.env.PORT_SERVER, () => {
  console.log(`Server is running ${process.env.SERVER_URL}${process.env.PORT_SERVER}`);
});
