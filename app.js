const express = require('express');
const bodyParser = require('body-parser');
const { create, update, list, search, deleteController } = require('./Controllers');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Create a new order
app.post('/orders/create', create);

// Update an order
app.post('/orders/update', update);

// List all orders for a given date
app.get('/orders/list', list);

// Query for a specific order by Order ID
app.all('/orders/search', search);

// Delete an order by Order ID
app.delete('/orders/delete', deleteController);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
