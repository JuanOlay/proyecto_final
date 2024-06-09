function login() {
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    if (correo && contrasena) {
        window.location.href = "{% url 'index' %}";
    } else {
        alert('Por favor, ingresa tu correo y contraseña.');
    }
}