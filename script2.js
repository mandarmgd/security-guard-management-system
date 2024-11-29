"use strict";

var modal = document.getElementById("loginModal");

var loginButton = document.getElementById("loginButton");

var span = document.getElementsByClassName("close")[0];

loginButton.onclick = function () {
  modal.style.display = "flex";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function showForgotPassword() {
  const forgotPasswordInput = document.getElementById("forgot-password-input");
  const forgotPasswordLink = document.querySelector(".forgot-password");
  forgotPasswordInput.style.display = "block";
  forgotPasswordLink.style.display = "none";
}

document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  const response = await fetch("http://localhost:5500/api/auth/loginManager", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const result = await response.json();
    localStorage.setItem("managerToken", result.token); // Store JWT token
    localStorage.setItem("managerUsername", data.username); // Store manager's username
    window.location.href = "dashboardMan.html";
  }
});

document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    pin: document.getElementById("PIN").value,
  };

  const response = await fetch("http://localhost:5500/api/auth/loginGuard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const result = await response.json();
    localStorage.setItem("guardToken", result.token); // Store JWT token
    localStorage.setItem("guardUsername", data.name); // Store guard's username
    window.location.href = "dashboardGuard.html";
  }
});
