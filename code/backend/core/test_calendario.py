import unittest
from datetime import date
from calendario import Calendar
import json
from events import Event
from datetime import datetime

calendario_prueba = Calendar()
print(calendario_prueba.show_calendar(2022))
event = Event(
            day = date(2022, 1, 1),
            type_of_event = "Work",
            name = "Meeting",
            notif_bool = True,
            email_adresses_list = ["test1@gmail.com", "test2@gmail.com"],
            notif_time = datetime(2022, 1, 1, 10, 0, 0)
        )
event_2 = Event(
            day = date(2022, 1, 1),
            type_of_event = "Meeting",
            name = "Meeting2",
            notif_bool = True,
            email_adresses_list = ["test1@gmail.com", "test2@gmail.com"],
            notif_time = datetime(2022, 1, 1, 10, 0, 0)
        )
json_event = event.to_json()
json_event_2 = event_2.to_json()
calendario_prueba.add_events(json_event)
calendario_prueba.add_events(json_event_2)
print(calendario_prueba.show_events())
print(calendario_prueba.show_by_type("Work"))
print(calendario_prueba.show_by_type("Meeting"))
print(calendario_prueba.update_event("Meeting", date(2023, 1, 1), "Work", True, [],datetime(2023, 1, 1, 10, 0, 0)))
print(calendario_prueba.show_events())
print(calendario_prueba.delete_event("Meeting3"))
print(calendario_prueba.show_events())
print(calendario_prueba.delete_event("Meeting3"))
print(calendario_prueba.get_event("Meeting2"))

print(Calendar.show_calendar_by_month(2000 , 1))

