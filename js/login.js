document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    loginButton.addEventListener('click', () => {
    

        // Obtiene los valores de los campos
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Verifica si los campos están vacíos
        if (!username || !password) {
            showAlertError(); // Muestra una alerta si los campos están vacíos
            return; // Detiene la ejecución del código si los campos están vacíos
        }
        showAlertSuccess();
        // Si la validación pasa, redirige a la página de inicio
        window.location.href = '.../index.html';
    });
});
function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");

}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

