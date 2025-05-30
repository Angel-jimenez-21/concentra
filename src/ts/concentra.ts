interface Concentra {
  nombre: string;
  trabajo: number;
  corto: number;
  largo: number;
}

function obtenerUsuario(): string | null {
  return localStorage.getItem("usuarioActivo");
}

function obtenerConcentras(): Concentra[] {
  const usuario = obtenerUsuario();
  if (!usuario) return [];

  const clave = `concentras_${usuario}`;
  return JSON.parse(localStorage.getItem(clave) || "[]");
}

function guardarConcentras(lista: Concentra[]): void {
  const usuario = obtenerUsuario();
  if (!usuario) return;

  const clave = `concentras_${usuario}`;
  localStorage.setItem(clave, JSON.stringify(lista));
}

function eliminarConcentra(nombre: string): void {
  const concentras = obtenerConcentras();
  const actualizados = concentras.filter(c => c.nombre !== nombre);
  guardarConcentras(actualizados);
  mostrarConcentras(); // Recarga la lista
}

function mostrarConcentras(): void {
  const contenedor = document.querySelector(".concentras-lista");
  if (!contenedor) return;

  const concentras = obtenerConcentras();

  contenedor.innerHTML = "";

  if (concentras.length === 0) {
    contenedor.innerHTML = "<p>No tienes concentras guardados aún.</p>";
    return;
  }

  concentras.forEach(c => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "concentra-card";

    tarjeta.innerHTML = `
      <div class="concentra-info">
        <h3>${c.nombre}</h3>
        <span>Trabajo: ${c.trabajo} min</span>
        <span>Descanso corto: ${c.corto} min</span>
        <span>Descanso largo: ${c.largo} min</span>
      </div>
      <div class="card-actions">
        <button class="btn-ver" data-nombre="${c.nombre}">Ver</button>
        <button class="btn-eliminar" data-nombre="${c.nombre}">Eliminar</button>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });

  // Eventos para los botones
  document.querySelectorAll(".btn-ver").forEach(btn => {
    btn.addEventListener("click", e => {
      const nombre = (e.target as HTMLElement).getAttribute("data-nombre");
      if (nombre) {
        window.location.href = `/concentra.html?nombre=${encodeURIComponent(nombre)}`;
      }
    });
  });

  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", e => {
      const nombre = (e.target as HTMLElement).getAttribute("data-nombre");
      if (nombre && confirm(`¿Eliminar el concentra "${nombre}"?`)) {
        eliminarConcentra(nombre);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", mostrarConcentras);