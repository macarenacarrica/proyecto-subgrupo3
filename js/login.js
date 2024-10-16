document.addEventListener("DOMContentLoaded", function() {
    // Verifica si ya se ingresó
    if (localStorage.getItem('sesionIniciada') === 'true') {
        // Si la sesión está ingresada, redirige al inicio
        if (window.location.pathname.includes("login.html")) {
            window.location.href = "index.html";
        } else {
            // Actualiza el botón del menú desplegable con el nombre de usuario
            const username = localStorage.getItem('nombreUsuario');
            const usuarioDropdown = document.getElementById("usuarioDropdown");
            usuarioDropdown.textContent = username; // Muestra el nombre de usuario
        }
    } else {
        // Si no hay sesión iniciada, proceder con la lógica del formulario
        const loginForm = document.getElementById("loginForm");
        const usernameInput = document.getElementById("username");
        const password = document.getElementById("password");
        const alertSuccess = document.getElementById("alert-success");
        const alertDanger = document.getElementById("alert-danger");



        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Evita que el formulario se envíe de forma predeterminado

            // Ocultar alertas
            hideAlerts();

            if (usernameInput.value.trim() === "" || password.value.trim() === "") {
                // Mostrar alerta de error
                showAlert(alertDanger);
            } else {
                if (isValidCredentials(usernameInput.value.trim(), password.value.trim())) {
                    // Guardar sesión al iniciar correctamente
                    localStorage.setItem('sesionIniciada', 'true');
                    localStorage.setItem('nombreUsuario', usernameInput.value.trim());

                    // Actualizar el botón del menú desplegable
                    const usuarioDropdown = document.getElementById("usuarioDropdown");
                    usuarioDropdown.textContent = usernameInput.value.trim(); // Muestra el nombre de usuario

                    // Mostrar alerta de éxito
                    showAlert(alertSuccess);

                    // Redirigir a index.html después de un corto retraso
                    setTimeout(function() {
                        window.location.href = "index.html";
                    }, 1500);
                } else {
                    showAlert(alertDanger, "Credenciales incorrectas.");
                }
            }
        });

        function hideAlerts() {
            alertSuccess.classList.remove("show");
            alertDanger.classList.remove("show");
        }

        function showAlert(alert, message = "Por favor, completa todos los campos.") {
            alert.textContent = message;
            alert.classList.add("show");
        }
    }

    // Función para cerrar sesión
    function logout() {
        // Limpiar el almacenamiento local
        localStorage.removeItem('sesionIniciada');
        localStorage.removeItem('nombreUsuario');
        
        // Redirigir a login.html
        window.location.href = "login.html";
    }

    // Agregar el evento de cerrar sesión al elemento correspondiente en el menú
    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
        logoutLink.addEventListener("click", function() {
            logout();
        });
    }
});
