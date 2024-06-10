# Calendar Task Organizer

This project is a task and event organizer implemented in Python using SQLAlchemy, FastAPI, Django, Celery, and PostgreSQL. It allows users to register events, view monthly calendars, delete events, and receive email notifications for scheduled events.

## Problem to Solve

The Calendar Task Organizer application aims to address the challenge of managing and organizing tasks and events efficiently. With the increasing workload and responsibilities, many individuals struggle to keep up with their schedules and reminders. This can lead to missing important events, overdue deadlines, and an overall sense of stress and disorganization.

Calendar Task Organizer provides a comprehensive solution to this problem by offering the following features:

- Ability to easily add, view, and delete events.
- Visualization of events in a monthly calendar for better planning.
- Email notifications for scheduled events.
- Intuitive organization of events by type and name.

With this application, users can stay organized, manage their tasks and events effectively, and never lose sight of important dates.

## Color Selection

The color selection in the application has been carefully chosen considering the nature of a calendar and user experience.

- **Shade of Blue**: The predominant blue tone has been chosen to highlight information related to the calendar and events. Blue is commonly associated with calmness and serenity, making it ideal for representing dates and events.

- **Green for Buttons**: Buttons and interactive elements are highlighted with a green tone to provide visual contrast and facilitate the identification of interactive actions. Green is associated with safety and progress, making it suitable for buttons and calls to action.

- **White**: White background is used for most of the application to provide a clean and minimalist appearance, facilitating reading and user navigation.

- **Red for Events**: When a day has a scheduled event, it is highlighted in red to effectively draw the user's attention to important days and upcoming events.

This color selection has been designed to offer an intuitive and enjoyable user experience, making it easy for users to view and manage events in the calendar.

# Data Used in the Project

1. **Events**:
   - Events represent the main data of the calendar.
   - Each event has the following fields:
     - `day`: Date of the event.
     - `type_of_event`: Type of the event.
     - `name`: Name of the event.
     - `notif_bool`: Boolean indicating if notification is enabled or not.
     - `email_adresses_list`: List of email addresses for notifications.
     - `notif_time`: Date and time of the notification.
   - These events can be stored in the database or created at runtime.

2. **Users**:
   - Users represent individuals who can access the system.
   - Each user has the following fields:
     - `gmail`: User's email address.
     - `password`: User's password.

3. **User Credentials**:
   - Represent the credentials necessary to authenticate a user.
   - Each set of credentials has the following fields:
     - `gmail`: User's email address.
     - `password`: User's password.

4. **Database Connection (PostgresConnection)**:
   - Represents the configuration needed to connect to a PostgreSQL database.
   - It uses the following connection data:
     - `db_user`: Database user.
     - `password`: Database user's password.
     - `host`: Database server address.
     - `port`: Database port.
     - `database_name`: Name of the database.

5. **Celery Configuration**:
   - Defines the Celery configuration for sending email notifications.
   - It uses a function `send_notification_email` which takes an event as input.

6. **Email Configuration (make_notification_email)**:
   - Defines the configuration and logic for sending notification emails for events.



## Object-Oriented Design

The Calendar Task Organizer application is designed with an object-oriented approach to ensure modularity, extensibility, and maintainability. Here's a more detailed description of the main classes and their responsibilities:

### `User` Class
- Represents a user of the application.
- Provides methods for user registration, login, and authentication.
- May be associated with creating and managing user-related events.

### `Event` Class
- Represents an event in the calendar.
- Stores information such as date, type, name, notification settings, and email addresses.
- Includes methods for adding events, serializing to JSON, and handling interactions with the database.

### `Calendar` Class
- Manages the calendar functionality.
- Provides methods for displaying events, showing the calendar by month, and filtering events by type or name.
- Coordinates interactions with the database and external services for event notifications.

### Other Supporting Classes
- `EmailService`: Sends email notifications using the Yagmail library.
- `AsyncTasks`: Defines Celery tasks for asynchronous event notifications.

This object-oriented design allows for a clear separation of concerns and facilitates maintenance and future enhancements of the application.


## Features

- User registration
- Login functionality
- Adding and deleting events
- Viewing events by type and name
- Viewing monthly calendars
- Sending email notifications for events

## Dependencies

### Backend

- Pydantic
- DateTime
- FastAPI
- SQLAlchemy
- Uvicorn
- Yagmail
- Pytz
- Redis
- Celery
- Psycopg2-binary

### Frontend

- Django

## Installation and Execution

1. Clone this repository:

```bash
git clone https://github.com/JuanOlay/final_project.git
```
2. Navigate to the project directory:
```bash
cd final_project/code
```
3. Run Docker Compose:
```bash
docker compose up
```
This will start the FastAPI, Celery, and PostgreSQL services.

## Usage

Once the containers are up and running, you can access the API at [http://localhost:8000](http://localhost:8000) and the frontend at [http://localhost:8082](http://localhost:8082).

### API (Backend)

- **User Registration**: `POST /user/register`
- **Login**: `POST /login`
- **Add Event**: `POST /user/save_event`
- **Delete Event**: `DELETE /user/delete_event/{name}`
- **View Events**: `GET /view_events`
- **View Monthly Calendar**: `GET /calendar/by_month/{year}/{month}`
- **View Events by Type**: `GET /calendar/show_by_type/{type}`
- **View Events by Name**: `GET /calendar/show_by_name/{name}`

### Frontend

You can access the following frontend pages:

- **Login**: [http://localhost:8082/event/login/](http://localhost:8082/event/login/) *(Navigate to [http://localhost:8082/event/login](http://localhost:8082/event/login) to start the experience)*
- **Main Page**: [http://localhost:8082/event/index/](http://localhost:8082/event/index/)
- **Add Event Form**: [http://localhost:8082/event/add_event_form/](http://localhost:8082/add_event_form/)
- **Calendar Events Page**: [http://localhost:8082/event/calendar_events/](http://localhost:8082/event/calendar_events/)

## Code Development

Code docs: [code/README.md](./code/README.md).

## Backend Development

Backend docs: [backend/README.md](./code/backend/README.md).

## Frontend Development

Frontend docs: [frontend/README.md](./code/frontend/README.md)

## Autor

- Juan Felipe Guevara Olaya