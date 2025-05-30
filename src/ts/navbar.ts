document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
