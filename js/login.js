document.addEventListener("DOMContentLoaded", function() {
    // Verifica si ya se ingresó
    if (localStorage.getItem('sesionIniciada') === 'true') {
        // Mostrar el nombre de usuario en el menú
        const nombreUsuario = localStorage.getItem('nombreUsuario');
        document.getElementById("nombreUsuarioDisplay").textContent = nombreUsuario;

        // Redirige si está en la página de login
        if (window.location.pathname.includes("login.html")) {
            window.location.href = "index.html";
        }

        // Manejo de cierre de sesión
        document.getElementById("logoutLink").addEventListener("click", function(event) {
            event.preventDefault(); // Evita la acción predeterminada del enlace
            localStorage.removeItem('sesionIniciada');
            localStorage.removeItem('nombreUsuario');
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
                alertDanger.classList.add("show");
            } else {
                // Guardar sesión al iniciar correctamente
                localStorage.setItem('sesionIniciada', 'true');
                localStorage.setItem('nombreUsuario', username.value.trim());
              
                // Mostrar alerta de éxito
                alertSuccess.classList.add("show");

                // Redirigir a index.html después de un corto retraso
                setTimeout(function() {
                    window.location.href = "index.html";
                }, 1500);
            }
        });
    }
});