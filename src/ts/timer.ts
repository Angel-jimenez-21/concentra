let tiempoInicial = 25 * 60; // 25 minutos en segundos
let tiempoRestante = tiempoInicial;
let intervalo: number | undefined;
let enPausa = false;

const display = document.getElementById("timer-display")!;
const startBtn = document.getElementById("start-btn")!;
const resetBtn = document.getElementById("reset-btn")!;
let cicloActual = 0;
const ciclosAntesDescansoLargo = 4;
let isRunning = false;
const cicloDisplay = document.getElementById("ciclo-count")!;

function actualizarCicloDisplay(): void {
  cicloDisplay.textContent = `Ciclos completados: ${Math.floor(cicloActual / ciclosAntesDescansoLargo)}`;
}


function toggleModal(modalId: string, show: boolean): void {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.toggle("hidden", !show);
  }
  
function actualizarDisplay(): void {
  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = tiempoRestante % 60;
  display.textContent = `${minutos.toString().padStart(2, '0')}:${segundos
    .toString()
    .padStart(2, '0')}`;
}

function iniciarTemporizador(): void {
  if (intervalo || tiempoRestante <= 0) return;
  intervalo = setInterval(() => {
    if(tiempoRestante > 0) {
        tiempoRestante--;
        actualizarDisplay();
      } else {
        clearInterval(intervalo);
intervalo = undefined;

// Guardar la sesión completada
registrarSesion(currentMode, times[currentMode]);

// Luego sigue con el cambio automático de modo
if (currentMode === "pomodoro") {
  cicloActual++;
  if (cicloActual % ciclosAntesDescansoLargo === 0) {
    cambiarModo("long");
  } else {
    cambiarModo("short");
  }
} else {
  cambiarModo("pomodoro");
}
actualizarCicloDisplay();
startBtn.textContent = "Comenzar";
isRunning = false;
enPausa = false;
resetBtn.classList.add("hidden");
alert("¡Tiempo terminado! Se ha iniciado el siguiente ciclo.");

        registrarSesion(currentMode, times[currentMode]);

        // Cambio automático de modo
        if (currentMode === "pomodoro") {
          cicloActual++;
          if (cicloActual % ciclosAntesDescansoLargo === 0) {
            cambiarModo("long");
          } else {
            cambiarModo("short");
          }
        } else {
          cambiarModo("pomodoro");
        }
      
        startBtn.textContent = "Comenzar";
        isRunning = false;
        enPausa = false;
        resetBtn.classList.add("hidden");
        alert("¡Tiempo terminado! Se ha iniciado el siguiente ciclo.");
      }
  }, 1000);
}

function pausarTemporizador(): void {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = undefined;
    enPausa = true;
  }
}

function reiniciarTemporizador(): void {
    clearInterval(intervalo);
    intervalo = undefined;
    tiempoRestante = times[currentMode] * 60;
    isRunning = false;
    enPausa = false;
    startBtn.textContent = "Comenzar";
    actualizarDisplay();
  }
  

// Eventos
startBtn.addEventListener("click", () => {
  if (!isRunning && !enPausa) {
    iniciarTemporizador();
    startBtn.textContent = "Pausar";
    isRunning = true;
    enPausa = false;
    resetBtn.classList.add("hidden"); // Ocultar reiniciar
  } else if (isRunning) {
    pausarTemporizador();
    startBtn.textContent = "Reanudar";
    isRunning = false;
    enPausa = true;
    resetBtn.classList.remove("hidden"); // Mostrar reiniciar
  } else if (enPausa) {
    iniciarTemporizador();
    startBtn.textContent = "Pausar";
    isRunning = true;
    enPausa = false;
    resetBtn.classList.add("hidden"); // Ocultar reiniciar de nuevo
  }
});

resetBtn.addEventListener("click", reiniciarTemporizador);

// Mostrar tiempo inicial
actualizarDisplay();

// Configuración de tiempos personalizados
const form = document.getElementById("config-form") as HTMLFormElement;

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const workInput = document.getElementById("work-time") as HTMLInputElement;
  const workMinutes = parseInt(workInput.value);

  tiempoInicial = workMinutes * 60;
  tiempoRestante = tiempoInicial;
  clearInterval(intervalo);
  intervalo = undefined;
  actualizarDisplay();
  alert("Tiempo actualizado correctamente.");
});

const tabs = document.querySelectorAll(".tab");
let currentMode: "pomodoro" | "short" | "long" = "pomodoro";

let times = {
  pomodoro: 25,
  short: 5,
  long: 15,
};

function cambiarModo(tipo: "pomodoro" | "short" | "long") {
  currentMode = tipo;
  tiempoInicial = times[tipo] * 60;
  tiempoRestante = tiempoInicial;
  clearInterval(intervalo);
  intervalo = undefined;
  actualizarDisplay();
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const tipo = tab.getAttribute("data-type") as "pomodoro" | "short" | "long";
    cambiarModo(tipo);
  });
});

// Modal de configuración
document.getElementById("config-btn")?.addEventListener("click", () => {
  toggleModal("config-modal", true);
});

document.getElementById("config-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const w = document.getElementById("work-time") as HTMLInputElement;
  const s = document.getElementById("short-break") as HTMLInputElement;
  const l = document.getElementById("long-break") as HTMLInputElement;
  times.pomodoro = parseInt(w.value);
  times.short = parseInt(s.value);
  times.long = parseInt(l.value);
  cambiarModo(currentMode);
  toggleModal("config-modal", false);
});

function registrarSesion(tipo: "pomodoro" | "short" | "long", minutos: number) {
    const hoy = new Date().toISOString().split("T")[0]; // solo YYYY-MM-DD
    const sesion = { tipo, fecha: hoy, duracion: minutos };
  
    const dataGuardada = localStorage.getItem("sesionesConcentra");
    const sesiones = dataGuardada ? JSON.parse(dataGuardada) : [];
  
    sesiones.push(sesion);
    localStorage.setItem("sesionesConcentra", JSON.stringify(sesiones));
  }
  