// 商品資料存在 localStorage
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [
    {name:"蘋果", price:30},
    {name:"香蕉", price:20},
    {name:"橘子", price:25}
  ];
}
function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// 顯示商品清單
function renderProducts() {
  const list = document.getElementById("product-list");
  if (!list) return;
  list.innerHTML = "";
  getProducts().forEach((p,i)=>{
    const div = document.createElement("div");
    div.textContent = `${p.name} - $${p.price}`;
    const btn = document.createElement("button");
    btn.textContent = "加入購物車";
    btn.onclick = ()=>addToCart(i);
    div.appendChild(btn);
    list.appendChild(div);
  });
}

// 購物車
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(index) {
  const products = getProducts();
  const cart = getCart();
  cart.push(products[index]);
  saveCart(cart);
  alert("已加入購物車");
}
function renderCart() {
  const cartDiv = document.getElementById("cart");
  if (!cartDiv) return;
  const cart = getCart();
  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach((item,i)=>{
    total += item.price;
    const div = document.createElement("div");
    div.textContent = `${item.name} - $${item.price}`;
    const btn = document.createElement("button");
    btn.textContent = "移除";
    btn.onclick = ()=>{ cart.splice(i,1); saveCart(cart); renderCart(); };
    div.appendChild(btn);
    cartDiv.appendChild(div);
  });
  cartDiv.innerHTML += `<p>總價: $${total}</p>`;
}
function checkout() {
  const cart = getCart();
  if (cart.length===0) { alert("購物車是空的"); return; }
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({items:cart, date:new Date().toLocaleString()});
  localStorage.setItem("orders", JSON.stringify(orders));
  saveCart([]);
  alert("結帳完成");
  renderCart();
}

// 訂單紀錄
function renderOrders() {
  const ordersDiv = document.getElementById("orders");
  if (!ordersDiv) return;
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  ordersDiv.innerHTML = "";
  orders.forEach(o=>{
    const div = document.createElement("div");
    div.textContent = `${o.date} - ${o.items.map(i=>i.name).join(", ")}`;
    ordersDiv.appendChild(div);
  });
}

// Admin
function adminLogin() {
  const pw = document.getElementById("admin-password").value;
  if (pw==="admin123") {
    document.getElementById("admin-login").style.display="none";
    document.getElementById("admin-panel").style.display="block";
    renderAdminProducts();
  } else {
    alert("密碼錯誤");
  }
}
function addProduct() {
  const name = document.getElementById("new-name").value;
  const price = parseInt(document.getElementById("new-price").value);
  if (!name || !price) { alert("請輸入完整資料"); return; }
  const products = getProducts();
  products.push({name, price});
  saveProducts(products);
  renderAdminProducts();
}
function renderAdminProducts() {
  const div = document.getElementById("admin-products");
  if (!div) return;
  div.innerHTML = "";
  getProducts().forEach((p,i)=>{
    const item = document.createElement("div");
    item.textContent = `${p.name} - $${p.price}`;
    const btn = document.createElement("button");
    btn.textContent = "刪除";
    btn.onclick = ()=>{
      const products = getProducts();
      products.splice(i,1);
      saveProducts(products);
      renderAdminProducts();
    };
    item.appendChild(btn);
    div.appendChild(item);
  });
}

// 初始化
window.onload = ()=>{
  renderProducts();
  renderCart();
  renderOrders();
};

