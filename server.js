const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
let orders = [];
app.use(express.static('public'));
app.use(express.json());

app.post('/api/order', (req, res) => {
  const order = req.body;
  order.status = "Erfasst";
  orders.unshift(order);
  res.send('Bestellung empfangen!');
});

app.post('/api/status', (req, res) => {
  const { index, status } = req.body;
  if (orders[index]) orders[index].status = status;
  res.send("Status aktualisiert");
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));