// Get DOM elements
const leftColumn = document.getElementById("left-column");
const rightColumn = document.getElementById("right-column");


let selectedEvents = [];

function handleEventSelection(event, eventName) {
    if (event.target.checked) {
        // Agregar evento a la lista de eventos seleccionados
        selectedEvents.push(eventName);
    } else {
        // Eliminar evento de la lista de eventos seleccionados
        selectedEvents = selectedEvents.filter(name => name !== eventName);
    }
}

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
 * Loads events from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of events.
 */
function loadEvents() {
    fetch('http://localhost:8080/view_events')
        .then(response => response.json())
        .then(data => {
            console.log('Loaded events:', data);
            // Limpiar la lista de eventos antes de cargar
            leftColumn.innerHTML = '';
            rightColumn.innerHTML = '';
            // Mostrar los eventos en la página
            data.forEach(event => {
                const eventBox = createEventBox(event);
                leftColumn.appendChild(eventBox);
            });
        })
        .catch(error => {
            console.error('Error fetching events:', error);
            alert("Error al cargar los eventos");
        });
}

/**
 * Loads the calendar events for the specified year and month.
 * @param {number} year - The year.
 * @param {number} month - The month.
 */
function loadCalendar(year, month) {
    fetch(`http://localhost:8080/calendar/by_month/${year}/${month}`)
        .then(response => response.json())
        .then(data => {
            console.log('Loaded calendar days:', data);
            loadEvents().then(events => {
                const daysWithEvents = data.filter(day => !isNaN(day) && day > 0 && day <= 31);
                displayEvents(daysWithEvents, events, year, month);
            });
        })
        .catch(error => {
            console.error("Error fetching calendar data:", error);
        });
}

/**
 * Shows details of an event in an alert.
 * @param {Object} event - The event object.
 */
function showEventDetails(event) {
    alert(`Event details:\n\nName: ${event.name || 'Name not available'}\nType: ${event.type_of_event || 'Type not available'}\nDate: ${event.day}`);
}

// Get current date, load the calendar, and display events
const currentDate = getCurrentDate();
loadCalendar(currentDate.year, currentDate.month);

/**
 * Displays events in two columns.
 * @param {Array} daysWithEvents - Array of days with events.
 * @param {Array} events - Array of events.
 * @param {number} year - The year.
 * @param {number} month - The month.
 */
function displayEvents(daysWithEvents, events, year, month) {
    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';

    const monthName = new Date(year, month - 1).toLocaleString('es', { month: 'long' });

    // Sort the days with events chronologically
    daysWithEvents.sort((a, b) => a - b);

    // Split the days into two groups for each column
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
            console.log('Events found for the day:', dateString, eventsForDay);
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
            console.log('Events found for the day:', dateString, eventsForDay);
            eventsForDay.forEach(event => {
                const eventBox = createEventBox(day, monthName, year, event);
                rightColumn.appendChild(eventBox);
            });
        }
    });

    // Adjust the height of the columns according to the actual number of events
    const leftColumnHeight = leftColumn.offsetHeight;
    const rightColumnHeight = rightColumn.offsetHeight;
    const maxHeight = Math.max(leftColumnHeight, rightColumnHeight);
    leftColumn.style.height = `${maxHeight}px`;
    rightColumn.style.height = `${maxHeight}px`;
}

/**
 * Creates an event box element.
 * @param {number} day - The day of the event.
 * @param {string} monthName - The name of the month.
 * @param {number} year - The year.
 * @param {Object} event - The event object.
 * @returns {HTMLElement} The event box element.
 */
function createEventBox(day, monthName, year, event) {
    const eventBox = document.createElement('div');
    eventBox.classList.add('event-box');
    eventBox.innerHTML = `<h3>${day} ${monthName} ${year}</h3><div class="event-details"><p><strong>Name:</strong> ${event.name || 'Name not available'}</p><p><strong>Type:</strong> ${event.type_of_event || 'Type not available'}</p><p><strong>Notify:</strong> ${event.notif_bool ? 'Yes' : 'No'}</p><p><strong>Emails:</strong> ${event.email_adresses_list ? event.email_adresses_list.join(', ') : 'Not available'}</p><p><strong>Notification Time:</strong> ${event.notif_time || 'Not available'}</p></div>`;
    eventBox.addEventListener('click', () => showEventDetails(event));
    return eventBox;
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
            alert('Event successfully deleted');
            // Update the event list
            loadEvents();
        } else {
            alert('Error deleting the event');
        }
    })
    .catch(error => {
        console.error('Error deleting the event:', error);
    });
}

function deleteSelectedEvents() {
    selectedEvents.forEach(eventName => {
        fetch(`http://localhost:8080/user/delete_event/${eventName}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Evento eliminado correctamente");
                // Actualizar la lista de eventos después de eliminar
                loadEvents();
            } else {
                console.error("Error al eliminar evento:", response.statusText);
                alert("Error al eliminar el evento");
            }
        })
        .catch(error => {
            console.error("Error al eliminar evento:", error);
            alert("Error al eliminar el evento");
        });
    });

    // Limpiar la lista de eventos seleccionados
    selectedEvents = [];
}

// Función para crear un cuadro de evento en la página
function createEventBox(event) {
    const eventBox = document.createElement('div');
    eventBox.classList.add('event-box');
    eventBox.innerHTML = `
        <input type="checkbox" class="event-checkbox" value="${event.name}">
        <span class="event-name">${event.name}</span>
    `;
    // Manejar la selección de eventos al hacer clic en el checkbox
    const checkbox = eventBox.querySelector('.event-checkbox');
    checkbox.addEventListener('change', () => handleEventSelection(event, checkbox.value));
    return eventBox;
}

// Event listener para el botón de eliminar eventos
deleteButton.addEventListener("click", deleteSelectedEvents);