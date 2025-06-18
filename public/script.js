const adminPIN = "8857";
let lastOrderCount = 0;

document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("admin-login-button");
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      const enteredPin = document.getElementById("admin-pin").value;
      if (enteredPin === adminPIN) {
        document.getElementById("admin-login").style.display = "none";
        document.getElementById("admin-content").style.display = "block";
      } else {
        alert("Falscher PIN");
      }
    });
  }

  setInterval(loadOrders, 5000);
});

async function loadOrders() {
  const res = await fetch("/api/orders");
  const orders = await res.json();

  if (orders.length > lastOrderCount) {
    playDingDong();
  }
  lastOrderCount = orders.length;

  const list = orders.map((o, i) => {
    return `<div><strong>Tisch ${o.table}</strong><br>${o.order.join("<br>")}
    <br>Status: <b>${o.status}</b></div><hr>`;
  }).join("");
  document.getElementById("orders").innerHTML = list;
}

function playDingDong() {
  const audio = new Audio("sounds/dingdong.mp3");
  audio.play();
  if ("vibrate" in navigator) {
    navigator.vibrate([200, 100, 200]);
  }
}
