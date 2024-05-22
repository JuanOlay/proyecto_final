# Course Project

This is a project to 

## Business Model

This is an application to emulate 

## User Stories

- As user, i want to register and log in whit my name and email to use the application.
- As user, i want to see a list of all my important dates to recognize them whitout them hindering me on the restof the days.
- As user, I want to view the special dates in alist according to their type to better organize myself.
- As user, I want to add important dates to the calendar.
- As user, I want to decide whether to receive noifications of my dates so as not to lose them.
- As user, I want to add notes to my date notifications to remember specific details of the event.
- As user, I want to see graphic badges according to the type of date to distinguish them from the calendar overview.
- As user, I want to share notifications with other gmails for shared events.
- As user, I want to be able to decide when to receive notifications of my dates so that you can notify me.

## Entities

- User: gmail.
- Calendar.
- Event : type, notifications.
- Notifier

## Web Services

- login -> User.login   POST    {gmail, password}
- saveEvent -> User.save_event  POST    {Event}
- updateEvent -> User.update_event  PUT    {name, day, type_of_event, notif_bool, email_adresses_list, notif_time}
- showByTypes -> Calendar.show_by_type  GET {type_of_event}
- markReceiveNotifications -> Event.mark_receive_notifications PATH {event}