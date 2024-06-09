# Calendar Task Organizer

This project is a Calendar Task Organizer application developed in Python using FastAPI, SQLAlchemy, Django, and Celery.

## Project Structure

```plaintext
code/
├── backend/
│   ├── core/
│   │   ├── calendar.py
│   │   └── events.py
│   ├── user_sub/
│   │   └── user.py
│   ├── calendario_services.py
│   ├── celery_config.py
│   ├── db_connection.py
│   ├── main.py
│   └── models.py
│
├── frontend/
│   ├── static/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   ├── calendar_ui/
│   └── calendar_event/
│       ├── static/
│       │   ├── css/
│       │   ├── js/
│       │   └── images/
│       └── templates/
│           ├── login.html
│           ├── index.html
│           ├── add_event_form.html
│           └── calendar_events.html
│       ├── urls.py
│       └── views.py
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```

## Backend

### `main.py`
- Entry point of the FastAPI services.
- Defines API endpoints for user registration, login, event management, and calendar operations.

### `core/calendar.py`
- Contains classes and methods to manage the calendar functionality.
- Implements calendar display, event addition, deletion, and filtering.

### `core/events.py`
- Defines the Event class representing events in the calendar.
- Handles event-related operations such as serialization, database interaction, and notifications.

### `user_sub/user.py`
- Contains classes and methods for user management.

### `calendario_services.py`
- Provides calendar-related services.

### `celery_config.py`
- Configuration for Celery tasks.

### `db_connection.py`
- Manages the connection to the database.

### `models.py`
- Contains database models.

## Frontend

### `calendar_event/urls.py` and `calendar_event/views.py`
- URL patterns and views for the frontend Django app.

### `calendar_event/templates/`
- HTML templates for login, main page, event form, and calendar events display.

### `frontend/static/`
- Static files including CSS, JS, and images for the frontend.

## Other Files

- `Dockerfile`: Configuration for Docker container.
- `docker-compose.yml`: Configuration for Docker Compose.
- `requirements.txt`: List of Python dependencies.
- `README.md`: Project documentation providing an overview, usage instructions, and project structure.
