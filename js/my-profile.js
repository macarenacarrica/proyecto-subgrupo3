document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Usamos e.preventDefault() para evitar que el formulario se envíe y la página se recargue
  
  const nombre = document.getElementById('nombre').value;
  const segundoNombre = document.getElementById('segundoNombre').value;
  const apellido = document.getElementById('apellido').value;
  const segundoApellido = document.getElementById('segundoApellido').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const fotoPerfil = document.getElementById('fotoPerfil').files[0];

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

  alert("Cambios guardados con éxito!");
});

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