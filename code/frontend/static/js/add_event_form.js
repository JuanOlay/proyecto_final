/**
 * This file contains functions to manage event data on the client-side.
 * Authors: Juan Felipe Guevara Olaya <> Junquito <>
 */

/**
 * Updates the event preview elements based on user input.
 */
function updatePreview() {
    // Updates preview elements with input values
    document.getElementById('namePreview').textContent = document.getElementById('name').value;
    document.getElementById('typePreview').textContent = document.getElementById('type_of_event').value;
    document.getElementById('dayPreview').textContent = document.getElementById('day').value;
    document.getElementById('notifPreview').textContent = document.getElementById('notif_bool').checked ? 'Yes' : 'No';
    document.getElementById('timePreview').textContent = document.getElementById('notif_time').value;
}

/**
 * Adds an email address to the list of event notifications.
 */
function addEmail() {
    const emailInput = document.getElementById('correo');
    const email = emailInput.value;

    if (email) {
        const emailsList = document.getElementById('emailsList');
        const li = document.createElement('li');
        li.textContent = email;
        emailsList.appendChild(li);

        emailInput.value = '';
    }
}

//replace in html function of python 
/**
 * Sends the event data to the server to save.
 */
function save_event() {
    // Constructs the event object from input values
    const event = {
        name: document.getElementById('name').value,
        type_of_event: document.getElementById('type_of_event').value,
        day: document.getElementById('day').value,
        notif_bool: document.getElementById('notif_bool').checked,
        notif_time: document.getElementById('notif_time').value,
        email_adresses_list: Array.from(document.getElementById('emailsList').children).map(li => li.textContent)
    };

    // Sends the event object to the server for saving
    fetch('http://localhost:8080/user/save_event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            alert('Event saved successfully');
            clearPreview();
            document.getElementById('add-event-form').reset();
        } else {
            alert('Event not saved');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error saving event');
    });
}

/**
 * Clears the event preview elements.
 */
function clearPreview() {
    document.getElementById('namePreview').textContent = '';
    document.getElementById('typePreview').textContent = '';
    document.getElementById('dayPreview').textContent = '';
    document.getElementById('notifPreview').textContent = '';
    document.getElementById('timePreview').textContent = '';
    document.getElementById('emailsList').innerHTML = '';
}
