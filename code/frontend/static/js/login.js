<<<<<<< Updated upstream
=======
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el botón de login por su ID
    const loginButton = document.getElementById('loginButton');

    // Agregar un event listener para el clic en el botón
    loginButton.addEventListener('click', function() {
        login();
    });
});

function login() {
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    if (correo && contrasena) {
        // Obtener la URL del atributo data-url del botón
        const url = document.getElementById('loginButton').getAttribute('data-url');
        
        // Redirigir al usuario a la URL obtenida
        window.location.href = url;
    } else {
        alert('Por favor, ingresa tu correo y contraseña.');
    }
}
>>>>>>> Stashed changes
