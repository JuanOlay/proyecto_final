/**
 * This file contains functions to manage the calendar and events on the client-side.
 * Authors: Juan Felipe Guevara Olaya <> Junquito <>
 */

// Get DOM elements
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const monthSelector = document.getElementById("month-selector");
const yearSelector = document.getElementById("year-selector");
const currentMonthElement = document.getElementById("current-month");

/**
 * Gets the current date.
 * @returns {Object} An object containing the current year and month.
 */
function getCurrentDate() {
    const currentDate = new Date();
    return {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1
    };
}

/**
 * Updates the text displaying the current month and year.
 * @param {number} year - The year.
 * @param {number} month - The month.
 */
function updateCurrentMonthText(year, month) {
    const monthName = new Date(year, month - 1, 1).toLocaleString('es', { month: 'long' }).toUpperCase();
    currentMonthElement.textContent = `${monthName} ${year}`;
}

/**
 * Loads events from the server.
 * @returns {Promise<Array>} A promise resolving to an array of events.
 */
function loadEvents() {
    return fetch('http://localhost:8080/view_events')
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error al obtener los eventos:', error);
            return [];
        });
}

/**
 * Loads the calendar for the specified month with events.
 * @param {number} year - The year.
 * @param {number} month - The month.
 */
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

/**
 * Processes and structures calendar data with events.
 * @param {Array} data - Array containing calendar data.
 * @param {Array} events - Array containing event data.
 * @param {number} year - The year.
 * @param {number} month - The month.
 */
function createCalendar(data, events, year, month) {
    const calendarioElement = document.getElementById("calendar-body");
    calendarioElement.innerHTML = ''; // Clear existing content

    const daysInWeek = 7;
    const weeks = Math.ceil(data.length / daysInWeek);

    for (let i = 0; i < weeks; i++) {
        const weekRow = document.createElement('tr');

        for (let j = i * daysInWeek; j < (i + 1) * daysInWeek; j++) {
            const day = data[j];
            const cell = document.createElement('td');
            cell.textContent = day !== '-' ? day : '';

            // Check if there are events on this day
            if (day !== '-') {
                const currentDate = new Date(year, month - 1, day).toISOString().split('T')[0];
                const dayEvents = events.filter(event => new Date(event.day).toISOString().split('T')[0] === currentDate);

                if (dayEvents.length > 0) {
                    const eventDetails = dayEvents.map(event => `Nombre: ${event.name}, Tipo: ${event.type_of_event}`).join('\n');
                    cell.classList.add('event-day'); // Add CSS class if there are events
                    cell.title = eventDetails; // Utilizamos el atributo title para mostrar los detalles al pasar el ratón
                    cell.textContent += ` (${dayEvents.length})`; // Mostramos el conteo de eventos
                }                
            }

            weekRow.appendChild(cell);
        }

        calendarioElement.appendChild(weekRow);
    }
}

// Get current date, update UI, and load calendar
const currentDate = getCurrentDate();
updateCurrentMonthText(currentDate.year, currentDate.month);
loadCalendar(currentDate.year, currentDate.month);

// Event listeners for navigation buttons and selectors
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

/**
 * Filters events based on user input.
 */
function filtro() {
    const filterInput = document.getElementById("filter-input").value.trim().toLowerCase();
    const filterType = document.getElementById("filter-type").value; // Puede ser 'name' o 'type_of_event'

    fetch(`http://localhost:8080/calendar/show_by_type/${filterType}?filter=${filterInput}`)
        .then(response => response.json())
        .then(filteredEvents => {
            createEventList(filteredEvents);
        })
        .catch(error => {
            console.error('Error al filtrar los eventos:', error);
        });
}

/**
 * Creates a list of events.
 * @param {Array} events - Array containing event data.
 */
function createEventList(events) {
    const eventListElement = document.getElementById("event-list");
    eventListElement.innerHTML = ''; // Limpiar la lista existente

    events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.textContent = `Nombre: ${event.name}, Tipo: ${event.type_of_event}, Fecha: ${event.day}`;
        eventListElement.appendChild(listItem);
    });
}

/**
 * Deletes an event.
 * @param {string} eventName - The name of the event to delete.
 */
function delete_event(eventName) {
    fetch(`http://localhost:8080/user/delete_event/${eventName}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Evento eliminado correctamente');
            // Actualizar la lista de eventos
            filtro();
        } else {
            alert('Error al eliminar el evento');
        }
    })
    .catch(error => {
        console.error('Error al eliminar el evento:', error);
    });
}

/**
 * Navigates to the add event page.
 */
function add_event() {
    window.location.href = 'C:/Users/felipe%20guevara.DESKTOP-OGTAIET/Documents/GitHub/Final_Project/web_gui/add_event_form.html'; // Cambia la ruta según sea necesario
}