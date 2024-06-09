// Get DOM elements
const leftColumn = document.getElementById("left-column");
const rightColumn = document.getElementById("right-column");

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
    return fetch('http://localhost:8080/view_events')
        .then(response => response.json())
        .then(data => {
            console.log('Loaded events:', data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching events:', error);
            return [];
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

// Get DOM elements for navigation buttons and selectors
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const monthSelector = document.getElementById("month-selector");
const yearSelector = document.getElementById("year-selector");
const currentMonthElement = document.getElementById("current-month");

<<<<<<< Updated upstream
=======

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
document.querySelector('.modal .close').addEventListener('click', hideDeleteModal);


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

>>>>>>> Stashed changes
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
updateCurrentMonthText(year, month);
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
updateCurrentMonthText(year, month);
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
    const filterType = document.getElementById("filter-type").value; // Can be 'name' or 'type_of_event'

    fetch(`http://localhost:8080/calendar/show_by_type/${filterType}?filter=${filterInput}`)
        .then(response => response.json())
        .then(filteredEvents => {
            createEventList(filteredEvents);
        })
        .catch(error => {
            console.error('Error filtering events:', error);
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
            alert('Event successfully deleted');
            // Update the event list
            filtro();
        } else {
            alert('Error deleting the event');
        }
    })
    .catch(error => {
        console.error('Error deleting the event:', error);
    });
}

/**
 * Navigates to the add event page.
 */
function add_event() {
    window.location.href = 'C:/Users/felipe%20guevara.DESKTOP-OGTAIET/Documents/GitHub/Final_Project/code/web_gui/add_event_form.html'; // Adjust the path as necessary
}
