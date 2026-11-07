const express = require('express');
const usersRoutes = require('./routes/users.routes');
const { notFound, errorHandler } = require('./middlewares/error-handler');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/users', usersRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
