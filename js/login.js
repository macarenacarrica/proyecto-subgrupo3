document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem('sesionIniciada') === 'true') {
        const primerNombre = localStorage.getItem('primerNombre');
        const nombreUsuario = localStorage.getItem('nombreUsuario');

        // Muestra el primer nombre si existe, de lo contrario muestra el nombre de usuario
        document.getElementById("nombreUsuarioDisplay").textContent = primerNombre || nombreUsuario;

        if (window.location.pathname.includes("login.html")) {
            window.location.href = "index.html";
        }

        document.getElementById("logoutLink").addEventListener("click", function(event) {
            event.preventDefault();
            localStorage.removeItem('sesionIniciada');
            localStorage.removeItem('nombreUsuario');
            localStorage.removeItem('primerNombre'); // Elimina el primer nombre al cerrar sesión
            window.location.href = "login.html";
        });
    } else {
        // Lógica del formulario de inicio de sesión
        const loginForm = document.getElementById("loginForm");
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const alertSuccess = document.getElementById("alert-success");
        const alertDanger = document.getElementById("alert-danger");

        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            alertSuccess.classList.remove("show");
            alertDanger.classList.remove("show");

            if (username.value.trim() === "" || password.value.trim() === "") {
                alertDanger.classList.add("show");
            } else {
                localStorage.setItem('sesionIniciada', 'true');
                localStorage.setItem('nombreUsuario', username.value.trim());
              
                alertSuccess.classList.add("show");

                setTimeout(function() {
                    window.location.href = "index.html";
                }, 1500);
            }
        });
    }
});
