# Calendar Task Organizer - Backend

This directory contains the backend code for the Calendar Task Organizer application. The backend is developed using FastAPI, Celery, and SQLAlchemy.

## Project Structure

```plaintext
backend/
├── core/
│ ├── calendar.py
│ └── events.py
├── user_sub/
│ └── user.py
├── calendario_services.py
├── celery_config.py
├── db_connection.py
├── main.py
└── models.py
```


## Files and Directories

### `core/`
- **calendar.py**
  - Manages calendar functionality including event display, addition, deletion, and filtering.
- **events.py**
  - Defines the Event class and handles event-related operations such as serialization, database interaction, and notifications.

### `user_sub/`
- **user.py**
  - Manages user-related operations and functionality.

### `calendario_services.py`
- Provides services related to calendar operations.

### `celery_config.py`
- Contains configuration for Celery tasks used for background processing.

### `db_connection.py`
- Manages the connection to the PostgreSQL database using SQLAlchemy.

### `main.py`
- The entry point of the FastAPI application. Defines API endpoints for:
  - User Registration: `POST /user/register`
  - Login: `POST /login`
  - Add Event: `POST /user/save_event`
  - Delete Event: `DELETE /user/delete_event/{name}`
  - View Events: `GET /view_events`
  - View Monthly Calendar: `GET /calendar/by_month/{year}/{month}`
  - View Events by Type: `GET /calendar/show_by_type/{type}`
  - View Events by Name: `GET /calendar/show_by_name/{name}`

### `models.py`
- Contains SQLAlchemy models for the database tables.

## Dependencies

The backend requires the following dependencies:

- pydantic
- datetime
- fastapi
- sqlalchemy
- uvicorn
- yagmail
- pytz
- Redis
- celery
- psycopg2-binary

These dependencies are listed in the `requirements.txt` file.

## Running the Backend

To run the backend services using Docker, navigate to the project root and use Docker Compose:

```bash
cd /final_project/code/backend
uvicorn main:app --host 0.0.0.0 --port 8080
