document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    company: document.getElementById("company").value,
    uniqueSentence: document.getElementById("unique-sentence").value,
  };

  const response = await fetch("http://localhost:5500/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    window.location.href = "loginManager.html";
  }
});
