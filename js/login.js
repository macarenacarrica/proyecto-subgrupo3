document.addEventListener("DOMContentLoaded", function() {
    const nombreUsuarioDisplay = document.getElementById("nombreUsuarioDisplay");

    // Verifica si ya se ingresó
    if (localStorage.getItem('sesionIniciada') === 'true') {
        updateNavbarUserInfo();

        // Redirige si está en la página de login
        if (window.location.pathname.includes("login.html")) {
            window.location.href = "index.html";
        }

        // Manejo de cierre de sesión
        document.getElementById("logoutLink").addEventListener("click", function(event) {
            event.preventDefault(); // Evita la acción predeterminada del enlace
            localStorage.removeItem('sesionIniciada');
            localStorage.removeItem('nombreUsuario');
            localStorage.removeItem('emailUsuario');
            window.location.href = "login.html"; // Redirigir a la página de login
        });
    } else {
        // Si no hay sesión iniciada, proceder con la lógica del formulario
        const loginForm = document.getElementById("loginForm");
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const alertSuccess = document.getElementById("alert-success");
        const alertDanger = document.getElementById("alert-danger");

        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

            // Ocultar alertas
            alertSuccess.classList.remove("show");
            alertDanger.classList.remove("show");

            if (username.value.trim() === "" || password.value.trim() === "") {
                // Mostrar alerta de error
                alertDanger.textContent = "Por favor, completa todos los campos.";
                alertDanger.classList.add("show");
            } else {
                // Guardar sesión al iniciar correctamente
                localStorage.setItem('sesionIniciada', 'true');
                localStorage.setItem('nombreUsuario', username.value.trim()); 
                localStorage.setItem('emailUsuario', username.value.trim() + "@ejemplo.com"); 

                // Mostrar alerta de éxito
                alertSuccess.classList.add("show");

                // Redirigir a index.html después de un corto retraso
                setTimeout(function() {
                    window.location.href = "index.html";
                }, 1500);
            }
        });
    }

    function updateNavbarUserInfo() {
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
});
