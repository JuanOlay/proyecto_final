"""
This file contains the classes and methods to manage the calendar of the application.

Author: Juan Felipe Guevara Olaya <> Junquito <>
"""
# pylint: disable=wrong-import-order
from .events import Event, EventDB
# pylint: disable=E0401
from db_connection import PostgresConnection
import calendar


class Calendar():
    """This class represents a calendar"""

    events = []

    @classmethod
    def show_events(cls):
        """
        This method is used to show the calendar of the dates.

        Returns:
            list: the list of dates.
        """
        if len(cls.events) == 0:
            list_events = []
            connection = PostgresConnection(
                "felipe.guevara.o.1211@gmail.com",
                "Password",
                "localhost",
                5432,
                "Calendario_para_proyecto_final"
                )
            for event_db in connection.session.query(EventDB).all():
                event_obj = Event(
                    day = event_db.day,
                    type_of_event = event_db.type_of_event,
                    name = event_db.name,
                    notif_bool = event_db.notif_bool,
                    email_adresses_list = event_db.email_adresses_list,
                    notif_time = event_db.notif_time
                )
                list_events.append(event_obj)
            cls.events = list_events
        return cls.events

    @classmethod
    def show_calendar(cls, age: int):
        """
        This method is used to show a calendar of the year.

        Returns:
            calendar with the function .calendar of the year imput.
        """
        if age > 1900 and age < 2100:
            return calendar.calendar(age, 2, 2, 2)

    # pylint: disable=E0213
    def show_calendar_by_month(year : int , month: int):
        """
        This method is used to show a calendar of the month.

        Returns:
            calendar with the function .month of the month imput.
        """
        return calendar.monthcalendar(year , month)

    @classmethod
    def show_by_type(cls, type_of_event: str):
        """
        This method is used to display events by type.

        Args:
            type_of_event (str): Type of events.
    
        Returns:
            A list of events by type.
        """
        events_by_type = []  # Lista para acumular eventos que coinciden con el tipo
        for json_event in cls.events:
            if isinstance(json_event, dict) and json_event.get("type_of_event") == type_of_event:
                events_by_type.append(json_event)
        return events_by_type


    @classmethod
    def add_events(cls,  json_event: dict):
        """
        This  method adds a event to list of events.

        Args:
            event (Event): event object to add
        """
        cls.events.append(json_event)

    @classmethod
    def get_event(cls, name: str):
        """
        This method performs a search by name.

        Args:
            name (str): Identifier of the event.

        Returns:
            List[Event]: List of events matching the input name.
        """
        matching_events = []
        for event in cls.events:
            if isinstance(event, dict) and event.get("name") == name:
                matching_events.append(event)
        return matching_events

    @classmethod
    def delete_event(cls, name: str):
        """
        This method deletes a date from the list based on its name.
        
        Args:
            name(str) : identifier of date
        """
        # pylint: disable=C0200
        for i in range(len(cls.events)):
            if isinstance(cls.events[i], dict) and cls.events[i]["name"] == name:
                del cls.events[i]
                print("Se borro el evento de forma correcta")
                break
            elif i == len(cls.events) - 1:
                print("No se encontro el evento")
                break
            else:
                continue
        return None
