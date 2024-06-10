document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function() {
        login();
    });
});

function login() {
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    if (correo && contrasena) {

        const url = document.getElementById('loginButton').getAttribute('data-url');

        window.location.href = url;
    } else {
        alert('Por favor, ingresa tu correo y contraseña.');
    }
}