const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

let orders = [];

app.use(express.static("public"));
app.use(express.json());

// Neue Bestellung
app.post("/api/order", (req, res) => {
  const order = req.body;
  orders.push({ ...order, status: "Bestellung erfasst" });
  res.status(200).json({ success: true });
});

// Alle Bestellungen abrufen
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log("Server läuft auf Port", PORT);
});
