
function cargarSidebar(): void {
    const sidebar = document.querySelector(".sidebar-menu");
    const usuario = localStorage.getItem("usuarioActivo");
  
    if (!sidebar || !usuario) return;
  
    const clave = `concentras_${usuario}`;
    const concentras = JSON.parse(localStorage.getItem(clave) || "[]");
  
    // Limpia y reconstruye el menú
    sidebar.innerHTML = `
      <a href="/index.html">Inicio</a>
      <a href="/concentra.html">Concentra actual</a>
      <a href="/stats.html">Estadísticas</a>
      <a href="/nuevo.html">Crear nuevo Concentra</a>
      <h4>Concentras</h4>
      ${concentras.map((c: any) => `<a href="/concentra.html?nombre=${encodeURIComponent(c.nombre)}">${c.nombre}</a>`).join("")}
    `;
  }
  
  document.addEventListener("DOMContentLoaded", cargarSidebar);
  