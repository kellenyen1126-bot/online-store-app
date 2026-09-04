// 使用者帳號系統
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function register() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;
  if (!username || !password) { alert("請輸入完整資料"); return; }
  const users = getUsers();
  if (users.find(u=>u.username===username)) {
    alert("帳號已存在");
    return;
  }
  users.push({username, password});
  saveUsers(users);
  alert("註冊成功，請登入");
  window.location.href = "login.html";
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const users = getUsers();
  const user = users.find(u=>u.username===username && u.password===password);
  if (user) {
    localStorage.setItem("currentUser", username);
    alert("登入成功");
    window.location.href = "index.html";
  } else {
    alert("帳號或密碼錯誤");
  }
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}
