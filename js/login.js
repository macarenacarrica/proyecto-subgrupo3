document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    loginButton.addEventListener('click', () => {
        // Limpia el mensaje de error
        errorMessage.textContent = '';

        // Obtiene los valores de los campos
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Verifica si los campos están vacíos
        if (!username || !password) {
            errorMessage.textContent = 'Por favor, complete todos los campos.';
            return; // Detiene la ejecución del código si los campos están vacíos
        }

        // Si la validación pasa, redirige a la página de inicio
        window.location.href = 'index.html';
    });
});

