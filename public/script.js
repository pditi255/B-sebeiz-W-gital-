const items = [
  { name: "Gemischter Salat", price: 8 },
  { name: "Schnitzel mit Pommes", price: 19 },
  { name: "Bratwurst mit Pommes", price: 14 },
  { name: "Vanilleglace", price: 9 },
  { name: "Schokopudding", price: 9 },
  { name: "Mineralwasser", price: 3 },
  { name: "Apfelschorle", price: 5 },
  { name: "Rivella", price: 5 },
  { name: "Bier", price: 7 },
  { name: "Kaffee", price: 5 },
  { name: "Kleines Bier", price: 4 }
];

const menuDiv = document.getElementById("menuItems");
const totalEl = document.getElementById("total");

items.forEach((item, i) => {
  const label = document.createElement("label");
  label.innerHTML = `${item.name} – CHF ${item.price}.– 
    <select name="item${i}" data-price="${item.price}">
      ${[...Array(11).keys()].map(n => `<option value="${n}">${n}</option>`).join("")}
    </select>`;
  menuDiv.appendChild(label);
});

document.querySelectorAll("select").forEach(sel => {
  sel.addEventListener("change", updateTotal);
});

function updateTotal() {
  let sum = 0;
  document.querySelectorAll("select").forEach(sel => {
    const qty = parseInt(sel.value);
    const price = parseFloat(sel.dataset.price);
    sum += qty * price;
  });
  totalEl.textContent = sum;
}

document.getElementById("orderForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const table = data.get("table");
  const order = [];
  items.forEach((item, i) => {
    const qty = parseInt(data.get("item" + i));
    if (qty > 0) order.push(`${qty}× ${item.name} (CHF ${item.price})`);
  });
  const res = await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table, order })
  });
  const text = await res.text();
  document.getElementById("statusMessage").innerHTML = "<strong>Bestellung erfasst!</strong>";
  e.target.reset();
  updateTotal();
});