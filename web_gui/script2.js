document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('day').addEventListener('input', updatePreview);
    document.getElementById('type_of_event').addEventListener('input', updatePreview);
    document.getElementById('name').addEventListener('input', updatePreview);
    document.getElementById('notif_bool').addEventListener('change', updatePreview);
    document.getElementById('notif_time').addEventListener('input', updatePreview);
    document.getElementById('agregarCorreo').addEventListener('click', addEmail);
});

function updatePreview() {
    document.getElementById('namePreview').textContent = document.getElementById('name').value;
    document.getElementById('typePreview').textContent = document.getElementById('type_of_event').value;
    document.getElementById('dayPreview').textContent = document.getElementById('day').value;
    document.getElementById('notifPreview').textContent = document.getElementById('notif_bool').checked ? 'Sí' : 'No';
    document.getElementById('timePreview').textContent = document.getElementById('notif_time').value;
}

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

function save_event() {
    const event = {
        name: document.getElementById('name').value,
        type_of_event: document.getElementById('type_of_event').value,
        day: document.getElementById('day').value,
        notif_bool: document.getElementById('notif_bool').checked,
        notif_time: document.getElementById('notif_time').value,
        email_adresses_list: Array.from(document.getElementById('emailsList').children).map(li => li.textContent)
    };

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
        if (data && data.success) {
            alert('Evento guardado exitosamente');
            clearPreview();
            document.getElementById('add-event-form').reset();
        } else {
            alert('Hubo un error al guardar el evento');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al guardar el evento');
    });
}

function clearPreview() {
    document.getElementById('namePreview').textContent = '';
    document.getElementById('typePreview').textContent = '';
    document.getElementById('dayPreview').textContent = '';
    document.getElementById('notifPreview').textContent = '';
    document.getElementById('timePreview').textContent = '';
    document.getElementById('emailsList').innerHTML = '';
}
