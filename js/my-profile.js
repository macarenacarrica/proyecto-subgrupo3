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
