document.getElementById('ingresoBtn').addEventListener('click', validateForm);

function validateForm() {
    // conseguir valores de los campos necesarios para rellenar formulario
    const usuario = document.getElementById('nombre').value;
    const contraseña = document.getElementById('contraseña').value;

    // check que ningún campo esté vacío
    if (usuario === '' || contraseña === '') {
        showAlertError();
        return;
    }
    showAlertSuccess();
}
function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");

}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}