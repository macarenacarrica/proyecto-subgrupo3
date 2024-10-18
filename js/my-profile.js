document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Usamos e.preventDefault() para evitar que el formulario se envíe y la página se recargue
  
  const nombre = document.getElementById('nombre').value;
  const segundoNombre = document.getElementById('segundoNombre').value;
  const apellido = document.getElementById('apellido').value;
  const segundoApellido = document.getElementById('segundoApellido').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const fotoPerfil = document.getElementById('fotoPerfil').files[0];

     // Guarda el nombre en localStorage
     localStorage.setItem('primerNombre', nombre);
     
  // Aquí puedes procesar los datos del formulario
  console.log({
    nombre,
    segundoNombre,
    apellido,
    segundoApellido,
    email,
    telefono,
    fotoPerfil
  });

  // Guardar datos en localStorage
  localStorage.setItem('nombre', nombre);
  localStorage.setItem('segundoNombre', segundoNombre);
  localStorage.setItem('apellido', apellido);
  localStorage.setItem('segundoApellido', segundoApellido);
  localStorage.setItem('email', email);
  localStorage.setItem('telefono', telefono);
  localStorage.setItem('fotoPerfil', fotoPerfil);

  alert("Cambios guardados con éxito!");
});

// Función para completar el formulario con datos de localStorage
function completarFormulario() {
  document.getElementById('nombre').value = localStorage.getItem('nombre') || '';
  document.getElementById('segundoNombre').value = localStorage.getItem('segundoNombre') || '';
  document.getElementById('apellido').value = localStorage.getItem('apellido') || '';
  document.getElementById('segundoApellido').value = localStorage.getItem('segundoApellido') || '';
  document.getElementById('email').value = localStorage.getItem('email') || '';
  document.getElementById('telefono').value = localStorage.getItem('telefono') || '';
  document.getElementById('fotoPerfil').value = localStorage.getItem('fotoPerfil') || '';
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", completarFormulario);

function completarEmail() {
  // Obtén el campo de entrada de email
  var emailInput = document.getElementById("email");
  
  // Obtén el nombre de usuario desde localStorage
  var nombreUsuario = localStorage.getItem('nombreUsuario');

  // Si ambos existen, establece el valor del campo email
  if (emailInput && nombreUsuario) {
      emailInput.value = nombreUsuario;
  }
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", completarEmail);