let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " 已加入購物車！");
}

function loadCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - NT$${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = "總金額: NT$" + total;
}

function checkout() {
  alert("結帳成功！");
  localStorage.removeItem("cart");
  cart = [];
  loadCart();
}

window.onload = () => {
  if (document.getElementById("cart-items")) {
    loadCart();
  }
};
