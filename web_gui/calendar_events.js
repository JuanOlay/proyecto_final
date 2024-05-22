// Get DOM elements
const leftColumn = document.getElementById("left-column");
const rightColumn = document.getElementById("right-column");

// Función para obtener la fecha actual
function getCurrentDate() {
    const currentDate = new Date();
    return {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1
    };
}

// Función para cargar eventos desde el servidor
function loadEvents() {
    return fetch('http://localhost:8080/view_events')
        .then(response => response.json())
        .then(data => {
            console.log('Eventos cargados:', data);
            return data;
        })
        .catch(error => {
            console.error('Error al obtener los eventos:', error);
            return [];
        });
}

// Función para cargar los eventos del calendario
function loadCalendar(year, month) {
    fetch(`http://localhost:8080/calendar/by_month/${year}/${month}`)
        .then(response => response.json())
        .then(data => {
            console.log('Días del calendario cargados:', data);
            loadEvents().then(events => {
                const daysWithEvents = data.filter(day => !isNaN(day) && day > 0 && day <= 31);
                displayEvents(daysWithEvents, events, year, month);
            });
        })
        .catch(error => {
            console.error("Error al obtener los datos del calendario:", error);
        });
}


// Función para mostrar detalles de un evento
function showEventDetails(event) {
    alert(`Detalles del evento:\n\nNombre: ${event.name || 'Nombre no disponible'}\nTipo: ${event.type_of_event || 'Tipo no disponible'}\nFecha: ${event.day}`);
}

// Obtener fecha actual, cargar el calendario y mostrar los eventos
const currentDate = getCurrentDate();
loadCalendar(currentDate.year, currentDate.month);

// Función para mostrar los eventos en dos columnas
// Función para mostrar los eventos en dos columnas
function displayEvents(daysWithEvents, events, year, month) {
    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';

    const monthName = new Date(year, month - 1).toLocaleString('es', { month: 'long' });

    // Ordenar los días con eventos cronológicamente
    daysWithEvents.sort((a, b) => a - b);

    // Dividir los días en dos grupos para cada columna
    const midIndex = Math.ceil(daysWithEvents.length / 2);
    const leftColumnDays = daysWithEvents.slice(0, midIndex);
    const rightColumnDays = daysWithEvents.slice(midIndex);

    leftColumnDays.forEach(day => {
        const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const currentDate = new Date(dateString);
        const eventsForDay = events.filter(event => {
            const eventDate = new Date(event.day);
            return eventDate.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0];
        });

        if (eventsForDay.length > 0) {
            console.log('Eventos encontrados para el día:', dateString, eventsForDay);
            eventsForDay.forEach(event => {
                const eventBox = createEventBox(day, monthName, year, event);
                leftColumn.appendChild(eventBox);
            });
        }
    });

    rightColumnDays.forEach(day => {
        const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const currentDate = new Date(dateString);
        const eventsForDay = events.filter(event => {
            const eventDate = new Date(event.day);
            return eventDate.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0];
        });

        if (eventsForDay.length > 0) {
            console.log('Eventos encontrados para el día:', dateString, eventsForDay);
            eventsForDay.forEach(event => {
                const eventBox = createEventBox(day, monthName, year, event);
                rightColumn.appendChild(eventBox);
            });
        } 
    });

    // Ajustar la altura de las columnas según la cantidad real de eventos
    const leftColumnHeight = leftColumn.offsetHeight;
    const rightColumnHeight = rightColumn.offsetHeight;
    const maxHeight = Math.max(leftColumnHeight, rightColumnHeight);
    leftColumn.style.height = `${maxHeight}px`;
    rightColumn.style.height = `${maxHeight}px`;
}


// Función para crear un cuadro de evento
function createEventBox(day, monthName, year, event) {
    const eventBox = document.createElement('div');
    eventBox.classList.add('event-box');
    eventBox.innerHTML = `<h3>${day} ${monthName} ${year}</h3><div class="event-details"><p><strong>Nombre:</strong> ${event.name || 'Nombre no disponible'}</p><p><strong>Tipo:</strong> ${event.type_of_event || 'Tipo no disponible'}</p><p><strong>Notificar:</strong> ${event.notif_bool ? 'Sí' : 'No'}</p><p><strong>Correos:</strong> ${event.email_adresses_list ? event.email_adresses_list.join(', ') : 'No disponible'}</p><p><strong>Hora de Notificación:</strong> ${event.notif_time || 'No disponible'}</p></div>`;
    eventBox.addEventListener('click', () => showEventDetails(event));
    return eventBox;
}



// Get DOM elements
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const monthSelector = document.getElementById("month-selector");
const yearSelector = document.getElementById("year-selector");
const currentMonthElement = document.getElementById("current-month");

/**
 * Updates the text displaying the current month and year.
 * @param {number} year - The year.
 * @param {number} month - The month.
 */
function updateCurrentMonthText(year, month) {
    const monthName = new Date(year, month - 1, 1).toLocaleString('es', { month: 'long' }).toUpperCase();
    currentMonthElement.textContent = `${monthName} ${year}`;
}

// Get current date, update UI, and load calendar
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