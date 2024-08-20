document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const alertSuccess = document.getElementById('alert-success');
    const alertDanger = document.getElementById('alert-danger');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario para manejar la validación

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Oculta ambas alertas al empezar
        alertSuccess.classList.remove('show');
        alertDanger.classList.remove('show');

        if (username === '' || password === '') {
            // Muestra la alerta de error si algún campo está vacío
            alertDanger.classList.add('show');
            alertDanger.querySelector('p').textContent = 'Debes completar todos los campos';
        } else {
            // Muestra la alerta de éxito (opcional) y redirige
            alertSuccess.classList.add('show');
            setTimeout(() => {
                window.location.href = 'index.html'; 
    });
});

