document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Evitar que el formulario se envíe y la página se recargue
  
  const nombre = document.getElementById('nombre').value.trim();
  const segundoNombre = document.getElementById('segundoNombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const segundoApellido = document.getElementById('segundoApellido').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const fotoPerfil = document.getElementById('fotoPerfil').files[0];

  // Guardar los datos en localStorage
  localStorage.setItem('nombreUsuario', nombre);
  localStorage.setItem('emailUsuario', email);
  localStorage.setItem('telefonoUsuario', telefono);
  localStorage.setItem('fotoPerfilUsuario', fotoPerfil)
  // Actualizar la barra de navegación
  updateNavbarUserInfo();

  // Procesar los datos del formulario
  console.log({
    nombre,
    segundoNombre,
    apellido,
    segundoApellido,
    email,
    telefono,
    fotoPerfil
  });

  alert("Cambios guardados con éxito!");
});

// Función para actualizar la barra de navegación
function updateNavbarUserInfo() {
  const nombreUsuarioDisplay = document.getElementById("nombreUsuarioDisplay");
  const nombre = localStorage.getItem('nombreUsuario');
  const email = localStorage.getItem('emailUsuario');

  // Mostrar el nombre si está disponible, de lo contrario el email
  if (nombre) {
    nombreUsuarioDisplay.textContent = nombre;
  } else if (email) {
    nombreUsuarioDisplay.textContent = email;
  } else {
    nombreUsuarioDisplay.textContent = "Usuario";
  }
}

// Llamar a la función al cargar la página para que muestre los datos actuales
document.addEventListener("DOMContentLoaded", function() {
  updateNavbarUserInfo();
});