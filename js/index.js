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
