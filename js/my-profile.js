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

/////////////////////


// Función para cambiar la foto de perfil y guardarla en localStorage
function saveProfileImage() {
  const fileInput = document.getElementById('fotoPerfil');
  const file = fileInput.files[0];

  if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
          const base64Image = event.target.result;

          // Guardar la imagen en localStorage
          localStorage.setItem('fotoPerfil', base64Image);

          // Mostrar la imagen seleccionada en la página
          document.querySelector('.profile-pic img').src = base64Image;

          alert('¡Foto de perfil actualizada y guardada!');
      };
      reader.readAsDataURL(file); // Convertir la imagen a Base64
  } else {
      alert('Por favor, selecciona una foto.');
  }
}

// Función para cargar la imagen de perfil desde localStorage cuando se carga la página
window.onload = function() {
  const storedImage = localStorage.getItem('fotoPerfil');
  if (storedImage) {
      // Si existe una imagen guardada, mostrarla
      document.querySelector('.profile-pic img').src = storedImage;
  }
};

// Asociar el cambio de imagen al evento "input change"
document.getElementById('fotoPerfil').addEventListener('change', saveProfileImage);
