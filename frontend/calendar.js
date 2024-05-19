function login(){
    let correo_ = document.getElementById("correo").value
    let password_ = document.getElementById("contrasena").value

    // JavaScrip Object
    let loginData = {
        correo: correo_,
        password: password_
    }

    console.log(loginData)
}
const today = new Date();
const currentMonth = today.getMonth() + 1; // Enero es 0, febrero es 1, etc.
const currentYear = today.getFullYear();
const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

// Crea los días del mes
const calendarContainer = document.getElementById('calendar');
for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = day;
    calendarContainer.appendChild(dayElement);
}