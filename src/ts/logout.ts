document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "/index.html";
  });
  
  const logoutBtn = document.getElementById("logout-btn");

logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "/index.html";
});

