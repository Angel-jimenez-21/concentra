// ✅ Función para mostrar u ocultar un modal
function toggleModal(modalId: string, show: boolean): void {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.toggle("hidden", !show);
  }
  
  // ✅ Mostrar modal de login
  document.getElementById("btn-login")?.addEventListener("click", () => {
    toggleModal("login-modal", true);
  });
  
  // ✅ Mostrar modal de registro desde el header
  document.getElementById("btn-register")?.addEventListener("click", () => {
    toggleModal("register-modal", true);
  });
  
  // ✅ Mostrar modal de registro desde CTA
  document.getElementById("btn-register-cta")?.addEventListener("click", () => {
    toggleModal("register-modal", true);
  });
  
  // ✅ Cerrar modales al hacer clic en el ícono "X"
  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleModal("login-modal", false);
      toggleModal("register-modal", false);
    });
  });
  
  // ✅ Cerrar modales si se hace clic fuera del contenido
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        (modal as HTMLElement).classList.add("hidden");
      }
    });
  });
  