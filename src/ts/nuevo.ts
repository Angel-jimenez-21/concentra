
interface Concentra {
    nombre: string;
    tiempos: {
      pomodoro: number;
      short: number;
      long: number;
    };
    creado: string;
  }
  
  const SESSION_KEY = "usuarioActivo";
  
  function guardarConcentra(concentra: Concentra) {
    const usuario = localStorage.getItem(SESSION_KEY);
    if (!usuario) return;
  
    const clave = `concentras_${usuario}`;
    const existentes = JSON.parse(localStorage.getItem(clave) || "[]");
    existentes.push(concentra);
    localStorage.setItem(clave, JSON.stringify(existentes));
  }
  
  document.getElementById("nuevo-concentra-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = (document.getElementById("nombre-concentra") as HTMLInputElement).value;
    const pomodoro = parseInt((document.getElementById("tiempo-trabajo") as HTMLInputElement).value);
    const short = parseInt((document.getElementById("tiempo-corto") as HTMLInputElement).value);
    const long = parseInt((document.getElementById("tiempo-largo") as HTMLInputElement).value);
  
    const nuevo: Concentra = {
      nombre,
      tiempos: { pomodoro, short, long },
      creado: new Date().toISOString()
    };
  
    guardarConcentra(nuevo);
    alert("Concentra guardado correctamente.");
    window.location.href = "/concentra.html";
  });
  