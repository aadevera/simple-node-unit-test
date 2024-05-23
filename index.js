const express = require('express');
const app = express();

const routes = require('./routers');
const { logger } = require('./middlewares');

app.use(express.json());
app.use(logger);
app.use(routes);
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found.' });
});

app.listen(3000, () => {
  console.log('Server listening on Port', 3000);
});
