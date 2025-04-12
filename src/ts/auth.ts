interface Usuario {
    nombre: string;
    correo: string;
    contraseña: string;
  }
  
  const STORAGE_KEY = "usuarios";
  const SESSION_KEY = "usuarioActivo";
  
  // Recupera la lista de usuarios desde el localStorage o devuelve un arreglo vacío si no existe
  function getUsuarios(): Usuario[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  }
  
  // Guarda un nuevo usuario en el localStorage
  function guardarUsuario(usuario: Usuario): void {
    const usuarios = getUsuarios();
    usuarios.push(usuario);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
  }
  
  // Intenta iniciar sesión: devuelve true si encuentra un usuario coincidente, false en caso contrario
  function iniciarSesion(correo: string, contraseña: string): boolean {
    const usuarios = getUsuarios();
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo === correo && u.contraseña === contraseña
    );
    if (usuarioEncontrado) {
      localStorage.setItem(SESSION_KEY, usuarioEncontrado.correo);
      return true;
    }
    return false;
  }
  
  // Manejador para el formulario de registro
  document.getElementById("register-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nombre = (form[0] as HTMLInputElement).value;
    const correo = (form[1] as HTMLInputElement).value;
    const contraseña = (form[2] as HTMLInputElement).value;
    
    guardarUsuario({ nombre, correo, contraseña });
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    form.reset();
  });
  
  // Manejador para el formulario de inicio de sesión
  document.getElementById("login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const correo = (form[0] as HTMLInputElement).value;
    const contraseña = (form[1] as HTMLInputElement).value;
    
    if (iniciarSesion(correo, contraseña)) {
      alert("Sesión iniciada correctamente");
      // Redirige a la vista principal de la aplicación, ajústalo de acuerdo a la estructura de tu proyecto
      window.location.href = "/concentra.html";

    } else {
      alert("Credenciales incorrectas. Intenta de nuevo.");
    }
  });
  