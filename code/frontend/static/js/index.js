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

// Modal elements
const deleteEventModal = document.getElementById("deleteEventModal");
const deleteEventForm = document.getElementById("deleteEventForm");
const closeModal = document.getElementsByClassName("close")[0];

/**
 * Shows the delete event modal.
 */
function showDeleteModal() {
    var modal = document.getElementById("deleteEventModal");
    modal.style.display = "block";
}

/**
 * Hides the delete event modal.
 */
function hideDeleteModal() {
    var modal = document.getElementById("deleteEventModal");
    modal.style.display = "none";
}

// Close modal when clicking on the close button
document.querySelector('.modal .close').onclick = function() {
    hideDeleteModal();
}

// Close modal when clicking outside of the modal content
window.onclick = function(event) {
    var modal = document.getElementById("deleteEventModal");
    if (event.target == modal) {
        hideDeleteModal();
    }
}

/**
 * Handles form submission for deleting an event.
 * @param {Event} event - The form submission event.
 */
document.getElementById("deleteEventForm").onsubmit = function(event) {
    event.preventDefault();
    var eventName = document.getElementById("eventName").value;
    console.log("Evento a eliminar: " + eventName);
    hideDeleteModal();
}

/**
 * Handles the delete event form submission.
 * @param {Event} event - The form submission event.
 */
deleteEventForm.onsubmit = function(event) {
    event.preventDefault();
    const eventName = document.getElementById("eventName").value;
    if (eventName) {
        loadEvents().then(events => {
            const eventExists = checkEventExists(events, eventName);
            if (eventExists) {
                delete_event(eventName);
                hideDeleteModal(); // Close modal after deleting the event
            } else {
                alert("No existe ningún evento con ese nombre.");
            }
        });
    } else {
        alert("Por favor, ingresa un nombre de evento válido.");
    }
};

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
                createCalendar(data, events, year, month);  // Pass the events and the year and month to the createCalendar function
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
                    cell.title = eventDetails; // Use the title attribute to show details on hover
                    cell.textContent += ` (${dayEvents.length})`; // Display the event count
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
 * Creates a list of events.
 * @param {Array} events - Array containing event data.
 */
function createEventList(events) {
    const eventListElement = document.getElementById("event-list");
    eventListElement.innerHTML = ''; // Clear existing list

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
            loadCalendar(currentDate.year, currentDate.month); // Reload the calendar (update the events)
        } else {
            alert('Error al eliminar el evento');
        }
    })
    .catch(error => {
        console.error('Error al eliminar el evento:', error);
    });
}

/**
 * Prompts the user to enter the name of the event to delete.
 * @returns {string|null} The name of the event to delete or null if cancelled.
 */
function promptEventName() {
    return prompt("Por favor, ingresa el nombre del evento que deseas eliminar:");
}

/**
 * Handles the delete event process.
 */
function handleDeleteEvent() {
    const eventName = promptEventName();
    if (eventName) {
        // Get the list of events and then check if an event with the same name exists
        loadEvents().then(events => {
            const eventExists = checkEventExists(events, eventName);
            if (eventExists) {
                delete_event(eventName);
            } else {
                alert("No existe ningún evento con ese nombre.");
            }
        });
    } else {
        alert("Por favor, ingresa un nombre de evento válido.");
    }
}

/**
 * Checks if an event with the specified name exists.
 * @param {Array} events - Array containing event data.
 * @param {string} eventName - The name of the event to check.
 * @returns {boolean} True if the event exists, otherwise false.
 */
function checkEventExists(events, eventName) {
    return events.some(event => event.name === eventName);
}

// Event listener for delete event button
const deleteEventButton = document.getElementById("delete-event-button");
deleteEventButton.addEventListener("click", showDeleteModal);

/**
 * Navigates to the add event page.
 */
function add_event() {
    window.location.href = 'C:/Users/felipe%20guevara.DESKTOP-OGTAIET/Documents/GitHub/Final_Project/code/web_gui/add_event_form.html';
}
