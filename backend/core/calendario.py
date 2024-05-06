"""
This file contains the classes and methods to manage the calendar of the application.

Author: Juan Felipe Guevara Olaya <> Junquito <>
"""
from typing import List
from datetime import date, datetime 
import calendar
from .events import Event , EventDB
from db_connection import PostgresConnection

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
            connection = PostgresConnection("felipe.guevara.o.1211@gmail.com", "Password", "localhost", 5432, "Calendario_para_proyecto_final")      
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

    @classmethod
    def show_by_type(cls, type_of_event):
        """
        This method is used to show the dates by type.

        Args:
            type (str): type of the dates.
        
        Returns:
            A the list of dates by type.
        """

        return [event for event in cls.events if event.type_of_event == type_of_event]

    @classmethod
    def add_events(cls,  event: Event):
        """
        This  method adds a date to list of dates.

        Args:
            date (Date): date object to add
        """
        cls.events.append(event)


    #osea si aja pero para queeeee


    @classmethod
    def update_event(
        cls, name: str, day : date, type_of_event : str,
        notif_bool : bool, email_adresses_list : List, notif_time : datetime
        ):
        """
        This method updates a date in the list based on its code.
        
        Args:
            name(str) : identifier of date
            day(date) : date of event
            type_of_event(str) : type of event
            notif_bool(bool) : will you be notified of the event?
            email_adresses_list(List) : List of emails that will be notified
            notif_time(datetime) : exact time of notification 
        """

        for i in range(len(cls.events)):
            if cls.events[i].name == name:
                cls.events[i].day = day
                cls.events[i].type_of_event = type_of_event
                cls.events[i].notif_bool = notif_bool
                cls.events[i].eail_adresses_list = email_adresses_list
                cls.events[i].notif_time = notif_time
                break



    @classmethod
    def get_event(cls, name : str) -> Event:
        """
        This method performs a search by name

        Args:
        name(str) : indentifier of the event

        Returns:
        event(Event) : event coincid of the name imput
        """
        for event in cls.events:
            if event.name == name:
                return event
        return None