const API = ["localhost", "127.0.0.1"].includes(location.hostname)
  ? "http://localhost:5000/api"
  : "https://campus-portal-rbir.onrender.com/api";

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function renderNav() {
  const nav = document.getElementById("navLinks");
  if (!nav) return;
  nav.innerHTML = "";
  const user = getUser();

  if (user && getToken()) {
    const post = document.createElement("a");
    post.className = "btn btn-light btn-sm me-2";
    post.href = "post.html";
    post.textContent = "Post item";

    const hi = document.createElement("span");
    hi.className = "text-white me-3";
    hi.textContent = "Hi, " + user.name;

    const out = document.createElement("button");
    out.className = "btn btn-outline-light btn-sm";
    out.textContent = "Logout";
    out.addEventListener("click", logout);

    nav.append(post, hi, out);
  } else {
    const login = document.createElement("a");
    login.className = "btn btn-outline-light btn-sm";
    login.href = "login.html";
    login.textContent = "Login / Register";
    nav.append(login);
  }
}

document.addEventListener("DOMContentLoaded", renderNav);