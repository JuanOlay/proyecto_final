"""

This file contains the classes and methods to manage the dates of the application.
Author: Juan Felipe Guevara Olaya <> Junquito <>

"""
from datetime import date, datetime 
from pydantic import BaseModel
from typing import List
from sqlalchemy import Column, String, Date, Boolean, DateTime
from sqlalchemy.orm import declarative_base

class Event(BaseModel):
    """This class represents the behavior of a date"""
    
    day : date
    type_of_event : str
    name : str
    notif_bool : bool
    email_adresses_list : List
    notif_time : datetime

    def __init__(self, day : date, type_of_event : str, name : str, notif_bool : bool, email_adresses_list : List, notif_time : datetime):
        """
        This method is used to initialize the class.

        Args:
            day (date): the date of the event
            type_of_event (str): the type of the event
            name (str): the name of the event
            notif_bool (bool): a boolean value indicating whether a notification for the event is enabled or not
            email_adresses_list (List): a list of email addresses for the event notifications
            notif_time (datetime): the date and time when the notification for the event should be sent
        """
        super().__init__(day = day, type_of_event = type_of_event, name = name, notif_bool = notif_bool, email_adresses_list = email_adresses_list, notif_time = notif_time)

    def to_json(self):
        # Convierte el objeto a un diccionario que puede ser serializado a JSON
        return {
            "day": self.day.isoformat(),
            "type_of_event": self.type_of_event,
            "name": self.name,
            "notif_bool": self.notif_bool,
            "email_adresses_list": self.email_adresses_list,
            "notif_time": self.notif_time.isoformat()
        }
    

    def add_to_db(self):
        """
        ni idea de para que es esta funcion pero se ve bonita ahi

        creo que es para añadirlo a la base de datos :p
        """
        session = self.connection.session()
        events_db = EventDB(
            day = self.day,
            type_of_event = self.type_of_event,
            name = self.name,
            notif_bool = self.notif_bool,
            email_adresses_list = self.email_adresses_list,
            notif_time = self.notif_time
        )

        self.session.add(events_db)
        self.session.commit()
        self.session.close()

    class Config:
        from_attributes = True

Base = declarative_base()

class EventDB(Base):
    """
    SQLAlchemy database model for the 'events' table.
    Each instance of this class represents a row in the 'events' table.

    Attributes:
    __tablename__ : str
        The name of the table this class maps to.
    day : Date
        The date of the event. This is also the primary key for the table.
    type_of_event : String
        The type of the event.
    name : String
        The name of the event.
    notif_bool : Boolean
        A boolean value indicating whether a notification for the event is enabled or not.
    email_adresses_list : String
        A string containing a list of email addresses for the event notifications.
    notif_time : DateTime
        The date and time when the notification for the event should be sent.
    """
    __tablename__ = "events"

    day = Column(Date, primary_key = True)
    type_of_event = Column(String)
    name = Column(String)
    notif_bool = Column(Boolean)
    email_adresses_list = Column(String)
    notif_time = Column(DateTime)