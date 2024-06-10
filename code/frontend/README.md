# Project FrontEnd

This is an example of a frontend using Django and HTML-CSS-JS team.

## Website Navigation Map

- **Login**: [http://localhost:8082/event/login](http://localhost:8082/event/login)
  - From Login, you navigate to:
    - **Main Page**: [http://localhost:8082/event/index](http://localhost:8082/event/index)
      - From the Main Page, you can navigate to:
        - **Add Event Form**: [http://localhost:8082/event/add_event_form](http://localhost:8082/event/add_event_form)
        - **Calendar Events Page**: [http://localhost:8082/event/calendar_events](http://localhost:8082/event/calendar_events)

## Project Structure

```plaintext
frontend/
├── static/
│ ├── css/
│ ├── js/
│ └── images/
├── calendar_ui/
└── calendar_event/
├── static/
│ ├── css/
│ ├── js/
│ └── images/
└── templates/
├── login.html
├── index.html
├── add_event_form.html
└── calendar_events.html
├── urls.py
└── views.py
```

## Files and Directories

### `static/`
- Contains static files such as CSS, JavaScript, and images used across the application.

### `calendar_event/`
- **static/**: Contains static files specific to the `calendar_event` app.
  - **css/**: CSS files for styling the calendar event pages.
  - **js/**: JavaScript files for interactive functionalities.
  - **images/**: Images used in the calendar event pages.
- **templates/**: Contains HTML templates for the `calendar_event` app.
  - **login.html**: Template for the login page.
  - **index.html**: Template for the main page.
  - **add_event_form.html**: Template for the add event form page.
  - **calendar_events.html**: Template for the calendar events page.
- **urls.py**: Defines URL patterns for the `calendar_event` app.
- **views.py**: Contains view functions for rendering the templates.

## Dependencies

The frontend requires the following dependency:

- Django

This dependency is listed in the `requirements.txt` file at the project root.

## Running the Frontend

To run the frontend, ensure you are in the project root and then use Docker Compose:

```bash
cd /final_project/code/frontend
python manage.py runserver 0.0.0.0:8082
