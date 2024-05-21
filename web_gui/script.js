// Obtener elementos del DOM
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const monthSelector = document.getElementById("month-selector");
const yearSelector = document.getElementById("year-selector");
const currentMonthElement = document.getElementById("current-month");

// Función para obtener la fecha actual
function getCurrentDate() {
    const currentDate = new Date();
    return {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1
    };
}

// Función para actualizar el texto del mes y año actual
function updateCurrentMonthText(year, month) {
    const monthName = new Date(year, month - 1, 1).toLocaleString('es', { month: 'long' }).toUpperCase();
    currentMonthElement.textContent = `${monthName} ${year}`;
}

// Función para cargar eventos desde el servidor
function loadEvents() {
    return fetch('http://localhost:8080/view_events')
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error al obtener los eventos:', error);
            return [];
        });
}

// Función para cargar el calendario del mes especificado con eventos
function loadCalendar(year, month) {
    fetch(`http://localhost:8080/calendar/by_month/${year}/${month}`)
        .then(response => response.json())
        .then(data => {
            loadEvents().then(events => {
                createCalendar(data, events, year, month);  // Pasar los eventos obtenidos y el año y mes a la función createCalendar
                updateCurrentMonthText(year, month);
            });
        })
        .catch(error => {
            console.error("Error al obtener los datos del calendario:", error);
        });
}

// Función para procesar y estructurar los datos del calendario con eventos
function createCalendar(data, events, year, month) {
    const calendarioElement = document.getElementById("calendar-body");
    calendarioElement.innerHTML = ''; // Limpiar el contenido existente

    const daysInWeek = 7; // Número de días en una semana
    const weeks = Math.ceil(data.length / daysInWeek); // Calcular el número de semanas

    for (let i = 0; i < weeks; i++) {
        const weekRow = document.createElement('tr');

        for (let j = i * daysInWeek; j < (i + 1) * daysInWeek; j++) {
            const day = data[j];
            const cell = document.createElement('td');
            cell.textContent = day !== '-' ? day : '';  // Mostrar día o dejar vacío

            // Verificar si hay un evento en este día
            if (day !== '-') {
                const currentDate = new Date(year, month - 1, day).toISOString().split('T')[0];
                const event = events.find(event => new Date(event.day).toISOString().split('T')[0] === currentDate);

                if (event) {
                    cell.classList.add('event-day');  // Añadir clase CSS si hay un evento
                    const eventInfo = document.createElement('div');
                    eventInfo.classList.add('event-info');
                    eventInfo.textContent = `Evento: ${event.name}, Tipo: ${event.type_of_event}`;
                    cell.appendChild(eventInfo);
                }
            }

            weekRow.appendChild(cell);
        }

        calendarioElement.appendChild(weekRow);
    }
}

// Obtener la fecha actual
const currentDate = getCurrentDate();
updateCurrentMonthText(currentDate.year, currentDate.month);
loadCalendar(currentDate.year, currentDate.month);

// Event listeners para los botones de navegación y selectores
prevMonthButton.addEventListener("click", () => {
    let year = parseInt(yearSelector.value);
    let month = parseInt(monthSelector.value) - 1;
    if (month === 0) {
        year--;
        month = 12;
    }
    loadCalendar(year, month);
    yearSelector.value = year;
    monthSelector.value = month;
});

nextMonthButton.addEventListener("click", () => {
    let year = parseInt(yearSelector.value);
    let month = parseInt(monthSelector.value) + 1;
    if (month === 13) {
        year++;
        month = 1;
    }
    loadCalendar(year, month);
    yearSelector.value = year;
    monthSelector.value = month;
});

monthSelector.addEventListener("change", () => {
    const year = parseInt(yearSelector.value);
    const month = parseInt(monthSelector.value);
    loadCalendar(year, month);
    updateCurrentMonthText(year, month);
});

yearSelector.addEventListener("change", () => {
    const year = parseInt(yearSelector.value);
    const month = parseInt(monthSelector.value);
    loadCalendar(year, month);
    updateCurrentMonthText(year, month);
});
