type Sesion = {
    tipo: "pomodoro" | "short" | "long";
    fecha: string;
    duracion: number;
  };
  
  const contenedor = document.getElementById("stats-container")!;
  
  function cargarSesiones() {
    const data = localStorage.getItem("sesionesConcentra");
    if (!data) {
      contenedor.innerHTML = "<p>No hay sesiones registradas aún.</p>";
      return;
    }
  
    const sesiones: Sesion[] = JSON.parse(data);
  
    if (sesiones.length === 0) {
      contenedor.innerHTML = "<p>No hay sesiones registradas aún.</p>";
      return;
    }
  
    sesiones.reverse().forEach((sesion) => {
      const card = document.createElement("div");
      card.classList.add("stat-card");
  
      card.innerHTML = `
        <h3>${formatearTipo(sesion.tipo)}</h3>
        <span><strong>Fecha:</strong> ${sesion.fecha}</span><br>
        <span><strong>Duración:</strong> ${sesion.duracion} minutos</span>
      `;
      contenedor.appendChild(card);
    });
  }
  
  function formatearTipo(tipo: string): string {
    switch (tipo) {
      case "pomodoro":
        return "Concentra";
      case "short":
        return "Descanso corto";
      case "long":
        return "Descanso largo";
      default:
        return tipo;
    }
  }
  
  cargarSesiones();
  