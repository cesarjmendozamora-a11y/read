const express = require('express');
const usersRoutes = require('./routes/users.routes');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/users', usersRoutes);

module.exports = app;
