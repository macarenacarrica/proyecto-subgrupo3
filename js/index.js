document.addEventListener("DOMContentLoaded", function() {
 
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//Esta función irá en todos los js que quieramos proteger y sea necesario iniciar sesión
window.onload = function() {
    // Verificar si la sesión está activa
    const sesionIniciada = localStorage.getItem('sesionIniciada');

    if (sesionIniciada !== 'true') {
        // Redirige a login.html si no está la sesión iniciada
        window.location.href = 'login.html';
    }
};

// MODO OSCURO 
// Toma el boton y le da funcionalidad de alternar entre modos
document.addEventListener("DOMContentLoaded", function () {

    //Seleccion del botón que alternará entre el modo oscuro y el modo claro usando su id
    const toggleDarkModeButton = document.getElementById("toggleDarkMode"); 
    //Seleccion de los iconos de sol y luna para mostrar
    const iconMoon = document.getElementById("iconMoon");
    const iconSun = document.getElementById("iconSun");
    //Seleccion del body para aplicarle el modo oscuro 
    const body = document.body;

    // Verificar si el modo oscuro está activado previamente
    if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark-mode');  // Aplica la clase de modo oscuro
      iconSun.classList.add('d-none');  // Oculta el sol
      iconMoon.classList.remove('d-none');   // Muestra la luna
    }

  // Alternancia de modo oscuro y claro
  toggleDarkModeButton.addEventListener('click', () => {
    if (body.getAttribute('data-bs-theme') === 'light') {
      // Activar modo oscuro
      body.setAttribute('data-bs-theme', 'dark');
      iconSun.classList.add('d-none'); // Oculta el sol
      iconMoon.classList.remove('d-none'); // Muestra la luna
      localStorage.setItem('darkMode', 'enabled'); // Guarda en localStorage
    } else {
      // Activar modo claro
      body.setAttribute('data-bs-theme', 'light');
      iconSun.classList.remove('d-none'); // Muestra el sol
      iconMoon.classList.add('d-none'); // Oculta la luna
      localStorage.setItem('darkMode', 'disabled'); // Guarda en localStorage
    }
  });
});
